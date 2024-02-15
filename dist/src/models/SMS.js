"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const SMSSchema = new mongoose.Schema({
    phone_number: {
        type: String,
    },
    otp: {
        type: String,
    },
    message: {
        type: String,
        required: true,
    },
    MsgFollowUpUniqueCode: {
        type: String,
        reuired: true,
    },
}, { timestamps: true });
const SMS = mongoose.model("SMS", SMSSchema);
exports.default = SMS;
//# sourceMappingURL=SMS.js.map