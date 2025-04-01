"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_PASS = exports.USER_EMAIL = exports.DB_URL = exports.JWT_SECRET = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3000;
exports.JWT_SECRET = process.env.JWT_SECRET || "Hello";
exports.DB_URL = process.env.DB_URL || "";
exports.USER_EMAIL = process.env.USER_EMAIL; // Your email address from .env
exports.USER_PASS = process.env.USER_PASS; // Your email password or app password from .env
