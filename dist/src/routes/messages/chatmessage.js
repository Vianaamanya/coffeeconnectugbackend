"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatMessageRoute = void 0;
const chats_1 = require("../../controllers/chats/chats");
const chatMessageRoute = (router) => {
    // Create a new message
    router.post("/chatmessages/create", chats_1.createChat);
    // Get users chats by his id and id of other person
    router.get("/chatmessages/getchats/:userId/:otherUserId", chats_1.getUserChats);
};
exports.chatMessageRoute = chatMessageRoute;
//# sourceMappingURL=chatmessage.js.map