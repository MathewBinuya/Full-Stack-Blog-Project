import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());


// import routes
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'

// route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);


// example route: http://localhost:4000/api/v1/users/register






export default app;