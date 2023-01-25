const express = require('express');
const { createShortURL, getShortURL } = require("../controller/short.js");
const router = express.Router();

router.post("/short", createShortURL);
router.get("/:shortUrl", getShortURL);

module.exports = router