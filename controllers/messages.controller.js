const { response } = require("express");
const ChatMessage = require("../models/ChatMessage");
const { sendResponse } = require("../utils/responseHandler");

const findAll = async (req, res = response) => {
  try {
    const messages = await ChatMessage.find();
    sendResponse(res, true, 200, "Successfully fetched messages", messages);
  } catch (error) {
    console.error(error);
    sendResponse(res, false, 500, "Server error", {}, error);
  }
};

module.exports = {
  findAll,
};
