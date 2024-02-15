"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatmessage_1 = require("./messages/chatmessage");
const smsRoute_1 = require("./sms/smsRoute");
const farmerRoute_1 = require("./users/farmerRoute");
const espRoute_1 = require("./users/espRoute");
const esRequestRoute_1 = require("./esrequests/esRequestRoute");
const auth_1 = require("./auth/auth");
const router = express_1.default.Router();
exports.default = () => {
    // FARMERS
    (0, farmerRoute_1.farmerRoute)(router);
    // ESP
    (0, espRoute_1.espRoute)(router);
    // CHAT MESSAGES
    (0, chatmessage_1.chatMessageRoute)(router);
    // ESP REQUESTS
    (0, esRequestRoute_1.esRequestRoute)(router);
    // AUTH
    (0, auth_1.authRoute)(router);
    // SMS
    (0, smsRoute_1.smsRoute)(router);
    return router;
};
//# sourceMappingURL=index.js.map