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
const swagger = swaggerUi.setup(pluginData, {customCss: '.swagger-ui .topbar { display: none }'})
app.use("/docs", swaggerUi.serve, swagger);
// redirect root to /docs
app.get("/", (_req, res) => res.redirect("/docs"));

app.get("/.well-known/ai-plugin.json", (_, res) => {
  res.json(pluginData);
});

app.use("/api/health", healthRouter);

app.get(["/favicon.ico", "/favicon-16x16.png", "/favicon-32x32.png"], (_req, res) => {
  res.status(204).end();
});

// Catch-all 404
app.use((req, res) => {
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
