import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { mockItems } from "../data/mock-items";

/**
 * @desc    Get all items
 * @route   GET /api/v1/items
 * @access  Public
 */
export const getItems = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedItems = mockItems.slice(startIndex, endIndex);

  res.json({
    success: true,
    count: paginatedItems.length,
    total: mockItems.length,
    page,
    data: paginatedItems,
  });
});

/**
 * @desc    Get single item by ID
 * @route   GET /api/v1/items/:id
 * @access  Public
 */
export const getItemById = asyncHandler(async (req: Request, res: Response) => {
  const item = mockItems.find((i) => i.id === req.params.id);

  if (!item) {
    res.status(404);
    throw new Error(`Item not found with id: ${req.params.id}`);
  }

  res.json({
    success: true,
    data: item,
  });
});

/**
 * @desc    Get items by status
 * @route   GET /api/v1/items/status/:status
 * @access  Public
 */
export const getItemsByStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const status = req.params.status;
    const filteredItems = mockItems.filter((i) => i.status === status);

    if (filteredItems.length === 0) {
      res.status(404);
      throw new Error(`No items found with status: ${status}`);
    }

    res.json({
      success: true,
      count: filteredItems.length,
      status,
      data: filteredItems,
    });
  },
);
