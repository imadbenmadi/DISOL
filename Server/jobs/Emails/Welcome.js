const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const errorLogger = require("../../utils/ErrorLogger");
dotenv.config();

// Create reusable transporter for shared hosting
const createSharedHostingTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST, // Replace with your shared host SMTP
        port: process.env.EMAIL_PORT, // Use 465 for SSL
        secure: true, // Ensures encryption
        auth: {
            user: process.env.EMAIL_NO_REPLY, // Your cPanel email
            pass: process.env.EMAIL_NO_REPLY_PWD, // Your cPanel email password
        },
        pool: true,
        maxConnections: 5,
        maxMessages: 10,
    });
};

// Create reusable transporter for Gmail using OAuth2
const createGmailTransporter = async () => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground" // Redirect URI
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) reject("Failed to create access token");
            resolve(token);
        });
    });

    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.GMAIL_EMAIL,
            accessToken,
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        },
    });
};

// In-memory queue to store email jobs
const emailQueue = [];
let isProcessing = false;

// Function to process the queue
const processQueue = async () => {
    if (isProcessing || emailQueue.length === 0) return; // Avoid overlapping processing
    isProcessing = true;

    while (emailQueue.length > 0) {
        const { toEmail, userName } = emailQueue[0]; // Get the first job in the queue

        try {
            await sendEmail(toEmail, userName);
            console.log("Email sent successfully!");
        } catch (error) {
            console.error("Failed to send email:", error);

            errorLogger.logDetailedError("EMAIL_SEND_ERROR", error);
        } finally {
            emailQueue.shift(); // Remove the processed job from the queue
        }
    }

    isProcessing = false; // Mark processing as complete
};

// Function to send the email
const sendEmail = async (toEmail, userName) => {
    let transporter = createSharedHostingTransporter();

    const mailOptions = {
        from: '"DISOL Team" <no-reply@disol-agency.com>',
        to: toEmail,
        subject: "Welcome to DISOL!",
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background: #f9f9f9; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #4caf50; font-size: 24px; margin-bottom: 20px;">Welcome to DISOL, ${userName}!</h1>
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
                We're excited to have you onboard. Explore our platform and let us help you grow!
            </p>
            <a href="https://disol-agency.com" style="display: inline-block; padding: 12px 24px; color: white; background: #4caf50; text-decoration: none; border-radius: 5px; font-size: 16px;">
                Visit DISOL
            </a>
            <p style="font-size: 14px; color: #777; margin-top: 20px;">
                If you have any questions, feel free to reply to this email.
            </p>
        </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent (Shared Hosting):", info.response);
    } catch (error) {
        console.error("Shared Hosting failed. Falling back to Gmail...", error);

        errorLogger.logDetailedError("EMAIL_SEND_ERROR", error);

        // Fallback to Gmail transporter
        transporter = await createGmailTransporter();
        mailOptions.from = `"DISOL Team" <${process.env.GMAIL_EMAIL}>`;
        const gmailInfo = await transporter.sendMail(mailOptions);
        console.log("Email sent (Gmail):", gmailInfo.response);
    }
};

// Function to add email jobs to the queue
const sendWelcomeEmail = (toEmail, userName) => {
    emailQueue.push({ toEmail, userName }); // Add the job to the queue
    processQueue(); // Start processing the queue if not already processing
};

module.exports = sendWelcomeEmail;
