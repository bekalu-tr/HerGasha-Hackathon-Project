import express from "express";

import {
  createSupportRequest,
  getMySupportRequests,
  getSupportRequestById,
} from "../controllers/supportController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/support
// Submit a support request.
router.post("/", protect, createSupportRequest);

// GET /api/support
// Get the logged-in user's support requests.
router.get("/", protect, getMySupportRequests);

// GET /api/support/:id
// Get one support request belonging to the logged-in user.
router.get("/:id", protect, getSupportRequestById);

export default router;
