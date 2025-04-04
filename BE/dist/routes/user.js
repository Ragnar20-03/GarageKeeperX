"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
exports.router = express_1.default.Router();
exports.router.post('/book-service', user_1.bookServiceController);
exports.router.post('/register', user_1.registerUserController);
