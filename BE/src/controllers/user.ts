import { Request, RequestHandler, Response } from "express";
import { IBookService } from "../types/types";
import { Booking, User } from "../db/db";



export const bookServiceController: RequestHandler | any = async (req: Request, res: Response) => {

    const { service, cname, carno, date, address, email, phone } = req.body as IBookService
    const BookingData = { service, cname, carno, date, address, email, phone }

    if (!service || !cname || !carno || !date || !address || !email || !phone) {
        return res.status(501).json({
            msg: "All Feilds are necessary !"
        })
    }
    console.log("booking data is ; ", BookingData);

    const booking = await Booking.create({ service, cname, carno, date, address, email, phone })
    if (booking) {
        res.status(200).json({
            msg: "Service Booked Succesfully !"
        })
    }
    else {
        return res.status(501).json({
            status: "failed",
            msg: " Booking failed !"
        })
    }
}

export const registerUserController = async (req: Request, res: Response): Promise<RequestHandler | any> => {
    const { username, password, firstname, lastname, email, phoneno, address } = req.body;


    if (!username || !password || !firstname || !lastname || !email || !phoneno || !address) {
        return res.status(200).json({
            rmsg: "All values are necessay !"
        })
    }

    const user = await User.create({ username, password, firstname, lastname, email, phoneno, address, isAdmin: false })
    if (user) {
        return res.status(200).json({
            status: "success",
            msg: "User created Succesfully !"
        })
    }
    else {
        return res.status(501).json({
            status: "success",
            msg: "User Creation Failed !"
        })
    }
}
