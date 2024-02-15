"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTPFromUser = exports.sendSMSToSingleUser = void 0;
const axios_1 = __importDefault(require("axios"));
const SMS_1 = __importDefault(require("../../models/SMS"));
const sendSMSToSingleUser = async (req, res) => {
    try {
        const { number } = req.body;
        const message = `Your verification pin for coffeeconnectug is 
    ${Math.floor(1000 + Math.random() * 9000)}`;
        const response = await axios_1.default.post(`${process.env.EGOSMSURL}`, {
            method: process.env.EGOSMSMETHOD,
            userdata: {
                username: process.env.EGOSMSUSERNAME,
                password: process.env.EGOSMSPASSWORD,
            },
            msgdata: [
                {
                    number,
                    message,
                    senderid: process.env.EGOSMSSENDERID,
                },
            ],
        });
        console.log(response.data);
        const dbsms = new SMS_1.default({
            phone_number: number,
            MsgFollowUpUniqueCode: response.data.MsgFollowUpUniqueCode,
            message,
            otp: message.match(/\d{4}$/).toString(), // extract pin at the end
        });
        const saveddbsms = await dbsms.save();
        return res.status(200).json(saveddbsms);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};
exports.sendSMSToSingleUser = sendSMSToSingleUser;
const verifyOTPFromUser = async (req, res) => {
    try {
        const { otp, phone_number } = req.body;
        console.log(otp, phone_number);
        const availableOtp = await SMS_1.default.findOne({
            phone_number: `${phone_number}`,
            otp,
        });
        if (!availableOtp) {
            return res.status(404).json("OTP not available hence invalid!");
        }
        return res.status(200).json("Successfully verified OTP!");
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};
exports.verifyOTPFromUser = verifyOTPFromUser;
//# sourceMappingURL=sms.js.map