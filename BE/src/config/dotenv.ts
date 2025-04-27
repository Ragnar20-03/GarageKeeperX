import dotenv from "dotenv"
dotenv.config()

export const PORT = process.env.PORT || 3000
export const JWT_SECRET = process.env.JWT_SECRET || "Hello"
export const DB_URL = process.env.DB_URL || ""

export const USER_EMAIL = process.env.USER_EMAIL
export const USER_PASS = process.env.USER_PASS 