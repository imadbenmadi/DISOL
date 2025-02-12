async function getTokens(authCode) {
    const { tokens } = await oAuth2Client.getToken(authCode);
    console.log("\n✅ Access Token:", tokens.access_token);
    console.log("✅ Refresh Token:", tokens.refresh_token);
}

getTokens("");
