import express from "express";
import { createPost, getAllposts, deletePost } from "../controllers/Posts.js";

const router = express.Router();

router.get("/", getAllposts);
router.post("/", createPost);
router.delete("/:id", deletePost);

export default router;
