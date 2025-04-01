import { Request, RequestHandler, Response } from "express";
import { Booking, User } from "../db/db";

export const getBookingsController: RequestHandler | any = async (req: Request, res: Response) => {
    let bookings = await Booking.find({})
    return res.status(200).json({
        bookings
    })
}

export const getBookingsControllerById: RequestHandler | any = async (req: Request, res: Response) => {
    let bid = req.params.bid;
    let booking = await Booking.findOne({
        _id: bid
    })
    return res.status(200).json({
        booking
    })
}

export const serviceDoneController: RequestHandler | any = async (req: Request, res: Response) => {
    let bid = req.params.bid
    let booking = await Booking.findByIdAndUpdate(bid, { status: "completed" })
    if (booking) {
        // inform custmoer via message
        return res.status(200).json({
            status: "sucess",
            msg: "Service Completed !",
            booking
        })
    }
    else {
        return res.status(501).json({
            status: "failed",
            msg: "Something went wrong !"
        })
    }
}



export const paymentDoneController: RequestHandler | any = async (req: Request, res: Response) => {
    let bid = req.params.bid
    let booking = await Booking.findByIdAndUpdate(bid, { payment: "completed" })
    if (booking) {
        // inform custmoer via message
        return res.status(200).json({
            status: "sucess",
            msg: "Service Completed !",
            booking
        })
    }
    else {
        return res.status(501).json({
            status: "failed",
            msg: "Something went wrong !"
        })
    }
}

export const getAllUsers: RequestHandler | any = async (req: Request, res: Response) => {
    let users = await User.find({})
    return res.status(200).json({
        status: "success",
        users
    })
}
export const getUserById: RequestHandler | any = async (req: Request, res: Response) => {
    let uid = req.params.uid
    let user = await User.findOne({ _id: uid })
    return res.status(200).json({
        status: "success",
        user
    })
}