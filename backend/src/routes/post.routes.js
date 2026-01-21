import { Router } from "express";
import { createPost, deletePosts, getPosts, updatePosts } from "../controllers/post.controller.js"
const router = Router();

router.route("/create").post(createPost);
router.route("/get").get(getPosts);
router.route("/update/:id").patch(updatePosts);
router.route("/delete/:id").delete(deletePosts);


// example route: http://localhost:4000/api/v1/posts/update/69709225aa62dda32712b322


export default router;

