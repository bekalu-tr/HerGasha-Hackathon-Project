import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import opportunityRoutes from "./routes/opportunityRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";

// Import error middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Parse incoming requests
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Parse cookies
app.use(cookieParser());

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Her Gasha API is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/support", supportRoutes);

// Handle unknown routes
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
