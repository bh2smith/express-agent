import cors from "cors";
import express from "express";
import { pluginData } from "./plugin.js";
import { healthRouter } from "./api/health.js";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve Swagger UI at the root path
app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(pluginData));

app.get("/.well-known/ai-plugin.json", (_, res) => {
  res.json(pluginData);
});

app.use("/api/health", healthRouter);

// Add a catch-all handler for other unhandled routes
app.use((req, res) => {
  // Only log if it's not a service worker or workbox request
  if (
    !req.path.includes("sw.js") &&
    !req.path.includes("workbox") &&
    !req.path.includes("fallback") &&
    !req.path.includes("favicon")
  ) {
    console.log(`⚠️  No route found for ${req.method} ${req.path}`);
  }
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
