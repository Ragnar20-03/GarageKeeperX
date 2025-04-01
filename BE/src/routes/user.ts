import express from "express"
import { bookServiceController, registerUserController } from "../controllers/user"
export const router = express.Router()


router.post('/book-service', bookServiceController)
router.post('/register', registerUserController)