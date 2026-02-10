import { Router } from "express";
import {
  getItems,
  getItemById,
  getItemsByStatus,
} from "../controllers/items.controller";

const router = Router();

// GET /api/v1/items - Get all items
router.get("/", getItems);

// GET /api/v1/items/status/:status - Get items by status
router.get("/status/:status", getItemsByStatus);

// GET /api/v1/items/:id - Get single item
router.get("/:id", getItemById);

export default router;
