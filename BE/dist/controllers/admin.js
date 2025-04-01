"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.paymentDoneController = exports.serviceDoneController = exports.getBookingsControllerById = exports.getBookingsController = void 0;
const db_1 = require("../db/db");
const getBookingsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let bookings = yield db_1.Booking.find({});
    return res.status(200).json({
        bookings
    });
});
exports.getBookingsController = getBookingsController;
const getBookingsControllerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let bid = req.params.bid;
    let booking = yield db_1.Booking.findOne({
        _id: bid
    });
    return res.status(200).json({
        booking
    });
});
exports.getBookingsControllerById = getBookingsControllerById;
const serviceDoneController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let bid = req.params.bid;
    let booking = yield db_1.Booking.findByIdAndUpdate(bid, { status: "completed" });
    if (booking) {
        // inform custmoer via message
        return res.status(200).json({
            status: "sucess",
            msg: "Service Completed !",
            booking
        });
    }
    else {
        return res.status(501).json({
            status: "failed",
            msg: "Something went wrong !"
        });
    }
});
exports.serviceDoneController = serviceDoneController;
const paymentDoneController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let bid = req.params.bid;
    let booking = yield db_1.Booking.findByIdAndUpdate(bid, { payment: "completed" });
    if (booking) {
        // inform custmoer via message
        return res.status(200).json({
            status: "sucess",
            msg: "Service Completed !",
            booking
        });
    }
    else {
        return res.status(501).json({
            status: "failed",
            msg: "Something went wrong !"
        });
    }
});
exports.paymentDoneController = paymentDoneController;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield db_1.User.find({});
    return res.status(200).json({
        status: "success",
        users
    });
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uid = req.params.uid;
    let user = yield db_1.User.findOne({ _id: uid });
    return res.status(200).json({
        status: "success",
        user
    });
});
exports.getUserById = getUserById;
