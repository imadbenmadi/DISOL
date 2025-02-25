const express = require("express");
const path = require("path");
const Content = require("../models/init");
const router = express.Router();

router.get("/", async (req, res) => {
    const centent = await Content.findAll();

    if (!centent) return res.status(404).send("No content found");
    res.send(centent);
    res.sendFile(path.join(__dirname, "public", "", "index.html")); // Serve the HTML file
});

module.exports = router;
