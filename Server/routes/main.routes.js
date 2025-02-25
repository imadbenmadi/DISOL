const express = require("express");
const path = require("path");
const { Content } = require("../models/init");
const router = express.Router();
const auth_middlware = require("../middleware/Users/Middlware.Auth");
router.get("/main", async (req, res) => {
    const centent = await Content.findAll();
    return res.status(200).json({ centent });
});
router.put("/main", auth_middlware, async (req, res) => {
    const { web_status } = req.body;
    
    const centent = await Content.create({ web_status });
    return res.status(200).json({ centent });
});

module.exports = router;
