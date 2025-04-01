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
exports.registerUserController = exports.bookServiceController = void 0;
const db_1 = require("../db/db");
const bookServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { service, cname, carno, date, address, email, phone } = req.body;
    const BookingData = { service, cname, carno, date, address, email, phone };
    if (!service || !cname || !carno || !date || !address || !email || !phone) {
        return res.status(501).json({
            msg: "All Feilds are necessary !"
        });
    }
    console.log("booking data is ; ", BookingData);
    const booking = yield db_1.Booking.create({ service, cname, carno, date, address, email, phone });
    if (booking) {
        res.status(200).json({
            msg: "Service Booked Succesfully !"
        });
    }
    else {
        return res.status(501).json({
            status: "failed",
            msg: " Booking failed !"
        });
    }
});
exports.bookServiceController = bookServiceController;
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstname, lastname, email, phoneno, address } = req.body;
    if (!username || !password || !firstname || !lastname || !email || !phoneno || !address) {
        return res.status(200).json({
            rmsg: "All values are necessay !"
        });
    }
    const user = yield db_1.User.create({ username, password, firstname, lastname, email, phoneno, address, isAdmin: false });
    if (user) {
        return res.status(200).json({
            status: "success",
            msg: "User created Succesfully !"
        });
    }
    else {
        return res.status(501).json({
            status: "success",
            msg: "User Creation Failed !"
        });
    }
});
exports.registerUserController = registerUserController;
