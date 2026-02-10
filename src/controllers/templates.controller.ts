import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { mockTemplates } from "../data/mock-templates";

/**
 * @desc    Get all templates
 * @route   GET /api/v1/templates
 * @access  Public
 */
export const getTemplates = asyncHandler(
  async (req: Request, res: Response) => {
    // In production, this would query a database with pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedTemplates = mockTemplates.slice(startIndex, endIndex);

    res.json({
      success: true,
      count: paginatedTemplates.length,
      total: mockTemplates.length,
      page,
      data: paginatedTemplates,
    });
  },
);

/**
 * @desc    Get single template by ID
 * @route   GET /api/v1/templates/:id
 * @access  Public
 */
export const getTemplateById = asyncHandler(
  async (req: Request, res: Response) => {
    const template = mockTemplates.find((t) => t.id === req.params.id);

    if (!template) {
      res.status(404);
      throw new Error(`Template not found with id: ${req.params.id}`);
    }

    res.json({
      success: true,
      data: template,
    });
  },
);

/**
 * @desc    Get templates by category
 * @route   GET /api/v1/templates/category/:category
 * @access  Public
 */
export const getTemplatesByCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = req.params.category;
    const filteredTemplates = mockTemplates.filter(
      (t) => t.category === category,
    );

    if (filteredTemplates.length === 0) {
      res.status(404);
      throw new Error(`No templates found for category: ${category}`);
    }

    res.json({
      success: true,
      count: filteredTemplates.length,
      category,
      data: filteredTemplates,
    });
  },
);
