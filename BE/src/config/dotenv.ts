import dotenv from "dotenv"
dotenv.config()

export const PORT = process.env.PORT || 3000
export const JWT_SECRET = process.env.JWT_SECRET || "Hello"
export const DB_URL = process.env.DB_URL || ""

export const USER_EMAIL = process.env.USER_EMAIL  // Your email address from .env
export const USER_PASS = process.env.USER_PASS // Your email password or app password from .env