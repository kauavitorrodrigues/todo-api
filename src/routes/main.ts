import express from "express"
import { router as taskRouter } from "./tasks"
import { router as userRouter } from "./users"

export const router = express.Router()

router.use("/tasks", taskRouter)
router.use("/users", userRouter)