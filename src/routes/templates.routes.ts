import { Router } from "express";
import {
  getTemplates,
  getTemplateById,
  getTemplatesByCategory,
} from "../controllers/templates.controller";

const router = Router();

// GET /api/v1/templates - Get all templates
router.get("/", getTemplates);

// GET /api/v1/templates/category/:category - Get templates by category
router.get("/category/:category", getTemplatesByCategory);

// GET /api/v1/templates/:id - Get single template
router.get("/:id", getTemplateById);

export default router;
