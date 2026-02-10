import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { mockProtocols } from "../data/mock-protocols";

/**
 * @desc    Get all protocols
 * @route   GET /api/v1/protocols
 * @access  Public
 */
export const getProtocols = asyncHandler(
  async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedProtocols = mockProtocols.slice(startIndex, endIndex);

    res.json({
      success: true,
      count: paginatedProtocols.length,
      total: mockProtocols.length,
      page,
      data: paginatedProtocols,
    });
  },
);

/**
 * @desc    Get single protocol by ID
 * @route   GET /api/v1/protocols/:id
 * @access  Public
 */
export const getProtocolById = asyncHandler(
  async (req: Request, res: Response) => {
    const protocol = mockProtocols.find((p) => p.id === req.params.id);

    if (!protocol) {
      res.status(404);
      throw new Error(`Protocol not found with id: ${req.params.id}`);
    }

    res.json({
      success: true,
      data: protocol,
    });
  },
);

/**
 * @desc    Get protocols by type
 * @route   GET /api/v1/protocols/type/:type
 * @access  Public
 */
export const getProtocolsByType = asyncHandler(
  async (req: Request, res: Response) => {
    const type = req.params.type;
    const filteredProtocols = mockProtocols.filter((p) => p.type === type);

    if (filteredProtocols.length === 0) {
      res.status(404);
      throw new Error(`No protocols found for type: ${type}`);
    }

    res.json({
      success: true,
      count: filteredProtocols.length,
      type,
      data: filteredProtocols,
    });
  },
);
