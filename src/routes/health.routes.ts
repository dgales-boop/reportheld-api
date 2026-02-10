import { Router, Request, Response } from "express";

const router = Router();

/**
 * @desc    Health check endpoint
 * @route   GET /health
 * @access  Public
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "reportheld-api",
    version: "1.0.0",
    uptime: process.uptime(),
  });
});

export default router;
