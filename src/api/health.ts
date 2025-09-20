import { Router, Request, Response } from "express";

const healthRouter = Router();

healthRouter.get("/", (req: Request, res: Response) => {
  console.log("Health check endpoint");
  res.status(200).json({ status: "ok" });
});

export { healthRouter };
