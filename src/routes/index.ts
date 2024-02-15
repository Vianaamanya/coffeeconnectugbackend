import express from "express";
import { userRoute } from "./users/updateuser";
import { chatMessageRoute } from "./messages/chatmessage";
import { smsRoute } from "./sms/smsRoute";
import { farmerRoute } from "./users/farmerRoute";
import { espRoute } from "./users/espRoute";
import { esRequestRoute } from "./esrequests/esRequestRoute";
import { authRoute } from "./auth/auth";
const router = express.Router();

export default (): express.Router => {
  // FARMERS
  farmerRoute(router);

  // ESP
  espRoute(router);

  // CHAT MESSAGES
  chatMessageRoute(router);

  // ESP REQUESTS
  esRequestRoute(router);

  // AUTH
  authRoute(router);

  // SMS
  smsRoute(router);
  return router;
};
