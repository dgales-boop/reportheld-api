import express, { Application } from "express";
import cors from "cors";
import path from "path";

// Import routes
import healthRoutes from "./routes/health.routes";
import templatesRoutes from "./routes/templates.routes";
import protocolsRoutes from "./routes/protocols.routes";
import itemsRoutes from "./routes/items.routes";

// Import middleware
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// ============================================
// Middleware
// ============================================

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, "../public")));

// ============================================
// Routes
// ============================================

// Health check
app.use("/health", healthRoutes);

// API routes
app.use("/api/v1/templates", templatesRoutes);
app.use("/api/v1/protocols", protocolsRoutes);
app.use("/api/v1/items", itemsRoutes);

// ============================================
// Error Handling
// ============================================

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
  console.log("Reportheld REST API - Week 1 Prototype");
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Frontend: http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/v1`);
});

export default app;
