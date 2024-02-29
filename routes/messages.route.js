const express = require("express");

const { findAll } = require("../controllers/messages.controller");

const router = express.Router();

router.get("/" ,findAll);

module.exports = router;