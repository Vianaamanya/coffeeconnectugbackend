import express from "express";
import {
  createESRequest,
  getAllESRequests,
  getESRequestById,
  updateESRequestById,
  deleteESRequestById,
  updateRepliesById, // Add this import
} from "../../controllers/esrequests/esRequestController";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../../utils/jwtUtils";

export const esRequestRoute = (router: express.Router) => {
  router.post("/es-requests", createESRequest);
  router.get("/es-requests", getAllESRequests);
  router.get("/es-requests/:id", verifyTokenAndAuthorization, getESRequestById);
  router.put(
    "/es-requests/:id",
    verifyTokenAndAuthorization,
    updateESRequestById
  );
  router.put(
    "/es-requests/:id/replies",
    verifyTokenAndAdmin,
    updateRepliesById
  );
  router.delete(
    "/es-requests/:id",
    verifyTokenAndAuthorization,
    deleteESRequestById
  );
};
