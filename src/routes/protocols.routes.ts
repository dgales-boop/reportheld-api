import { Router } from "express";
import {
  getProtocols,
  getProtocolById,
  getProtocolsByType,
} from "../controllers/protocols.controller";

const router = Router();

// GET /api/v1/protocols - Get all protocols
router.get("/", getProtocols);

// GET /api/v1/protocols/type/:type - Get protocols by type
router.get("/type/:type", getProtocolsByType);

// GET /api/v1/protocols/:id - Get single protocol
router.get("/:id", getProtocolById);

export default router;
