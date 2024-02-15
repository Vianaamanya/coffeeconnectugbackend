import { createChat, getUserChats } from "../../controllers/chats/chats";
import express from "express";

export const chatMessageRoute = (router: express.Router) => {
  // Create a new message
  router.post("/chatmessages/create", createChat);

  // Get users chats by his id and id of other person
  router.get("/chatmessages/getchats/:userId/:otherUserId", getUserChats);
};
