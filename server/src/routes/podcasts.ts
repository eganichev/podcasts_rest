import express from "express";
import validate from "../middleware/validate";
import podcastsQuerySchema from "../validation/podcast";
import { getPodcasts } from "../controllers/podcasts";

const router = express.Router();

router.get("/", validate(podcastsQuerySchema), getPodcasts);

export default router;
