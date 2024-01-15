import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ status: "OK", message: "API Gateway is alive!" });
});

export default router;
