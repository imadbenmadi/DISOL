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
    if (!web_status)
        return res.status(400).json({ msg: "web_status is required" });
    if (
        web_status !== "active" &&
        web_status !== "maintenance" &&
        web_status !== "down"
    )
        return res
            .status(400)
            .json({ msg: "web_status must be active or maintenance or down" });
    content_exist = await Content.findOne({ where: { id: 1 } });
    const centent = null;
    if (content_exist) {
        centent = await Content.update({ web_status }, { where: { id: 1 } });
    } else {
        // destroy everything and create new one
        await Content.destroy({ where: {} });
        centent = await Content.create({ web_status });
    }
    return res.status(200).json({ centent });
});

module.exports = router;
