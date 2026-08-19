// Express Server Entry Point
// Sets up the REST API for Employee Salary Management
// Routes: /api/work-modes, /api/employees, /api/health

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { workModeRoutes } from "./routes/workModes.js";
import { employeeRoutes } from "./routes/employees.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for frontend development (Vite runs on different port)
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// Work mode CRUD endpoints (create, read, update, delete work modes)
app.use("/api/work-modes", workModeRoutes);
// Employee CRUD endpoints (create, read, update, delete employees)
app.use("/api/employees", employeeRoutes);

// Health check endpoint for monitoring
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Central error handler - maps errors to HTTP status codes
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
