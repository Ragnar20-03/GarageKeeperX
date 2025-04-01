"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controllers/admin");
exports.router = express_1.default.Router();
exports.router.get('/get-bookings', admin_1.getBookingsController);
exports.router.get('/get-bookings/:bid', admin_1.getBookingsControllerById);
exports.router.post('/service-done/:bid', admin_1.serviceDoneController);
exports.router.post('/payment-done/:bid', admin_1.paymentDoneController);
exports.router.post('/get-users', admin_1.getAllUsers);
exports.router.post('/get-users/:uid', admin_1.getUserById);
