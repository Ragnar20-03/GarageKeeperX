import express from "express"
import { getAllUsers, getBookingsController, getBookingsControllerById, getUserById, paymentDoneController, serviceDoneController } from "../controllers/admin"
export const router = express.Router()

router.get('/get-bookings', getBookingsController)
router.get('/get-bookings/:bid', getBookingsControllerById)
router.post('/service-done/:bid', serviceDoneController)
router.post('/payment-done/:bid', paymentDoneController)
router.post('/get-users', getAllUsers)
router.post('/get-users/:uid', getUserById)