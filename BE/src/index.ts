import express from "express"
import cors from "cors"
import { router as userRouter } from "./routes/user"
import { router as adminRouter } from "./routes/admin"
import { User, Booking } from "./db/db";
const app = express();
app.use(cors())
app.use(express.json())
app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.get('/', (req, res) => {
    res.status(200).json({
        msg: "Jay Ganesh !"
    })
})

app.listen(5100, () => {
    console.log("server started on port number : 5100");

})