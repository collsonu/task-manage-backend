import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { verifyJWT } from './middlewares/auth.middleware.js'

const app = express()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cookieParser());

app.use(cors({

    origin: true,
    credentials: true,
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())


//routes import
import userRoute from './routes/user.routes.js'
import taskRouter from './routes/task.routes.js'


//routes declaration
app.use("/health", (req, res) => {
    res.status(200).json({
        message: "Server is up and running"
    })
})
app.use("/users", userRoute)
app.use("/tasks", verifyJWT, taskRouter)



export { app }

