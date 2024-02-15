"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsRoute = void 0;
const sms_1 = require("../../controllers/SMS/sms");
const smsRoute = (router) => {
    // SEND SMS TO SINGLE USER
    router.post("/sms/singleuser/sendsinglesms", sms_1.sendSMSToSingleUser);
    // VERIFY SMS/otp
    router.post("/sms/singleuser/verify/verifyotp", sms_1.verifyOTPFromUser);
};
exports.smsRoute = smsRoute;
//# sourceMappingURL=smsRoute.js.map