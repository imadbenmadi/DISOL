const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
// Create reusable transporter for shared hosting
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST, // Replace with your shared host SMTP
        port: process.env.EMAIL_PORT, // Use 465 for SSL
        secure: true, // Ensures encryption
        auth: {
            user: process.env.EMAIL_NO_REPLY, // Your cPanel email
            pass: process.env.EMAIL_NO_REPLY_PWD, // Your cPanel email password
        },
        pool: true, // Enables connection pooling for efficiency
        maxConnections: 5, // Limit simultaneous connections
        maxMessages: 10, // Limit messages per connection
    });
};

// Function to send welcome email
const sendWelcomeEmail = async (toEmail, userName) => {
    const transporter = createTransporter();

    // Email content
    const mailOptions = {
        from: '"DISOL Team" <no-reply@disol-agency.com>',
        to: toEmail,
        subject: "Welcome to DISOL!",
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background: #f9f9f9;">
        <h1 style="color: #4caf50;">Welcome to DISOL, ${userName}!</h1>
        <p>We're excited to have you onboard. Explore our platform and let us help you grow!</p>
        <br>
        <a href="https://disol-agency.com" style="display: inline-block; padding: 10px 20px; color: white; background: #4caf50; text-decoration: none; border-radius: 5px;">Visit DISOL</a>
      </div>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return { success: true, message: "Welcome email sent successfully!" };
    } catch (error) {
        console.error("Error sending email:", error);

        // Retry Logic
        let retryCount = 0;
        while (retryCount < 3) {
            try {
                retryCount++;
                console.log(`Retrying (${retryCount})...`);
                const retryInfo = await transporter.sendMail(mailOptions);
                console.log("Email sent on retry:", retryInfo.response);
                return {
                    success: true,
                    message: "Welcome email sent on retry!",
                };
            } catch (retryError) {
                console.error("Retry failed:", retryError);
            }
        }

        // Fallback to log or notify
        return {
            success: false,
            message: "Failed to send email after retries.",
            error,
        };
    }
};

module.exports = sendWelcomeEmail;
