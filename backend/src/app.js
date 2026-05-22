import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import globalErrorHandler from './middleware/error.middleware.js'


const app = express()


app.use(cors({
    origin: process.env.CORS || '*',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))



app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// import routers
import { authLimiter, globalLimiter } from './middleware/rateLimiter.middleware.js'
import authRouter from './routes/auth.route.js'
import aboutRouter from './routes/about.route.js'
import announcementsRouter from './routes/announcements.route.js'
import calendarEventRouter from './routes/calendarEvent.route.js'
import feeStructureRouter from './routes/feeStructure.route.js'
import noticeRouter from './routes/notice.route.js'
import academicRouter from './routes/academic.route.js'
import galleryRouter from './routes/gallery.route.js'
import admissionRouter from './routes/admission.route.js'
import inquiriesRouter from './routes/inquiries.route.js'


// routers
app.use("/api", globalLimiter)
app.use("/api/vidyalaya/v1/auth", authLimiter, authRouter)
app.use("/api/vidyalaya/v1/about", aboutRouter)
app.use("/api/vidyalaya/v1/announcements", announcementsRouter)
app.use("/api/vidyalaya/v1/calendar", calendarEventRouter)
app.use("/api/vidyalaya/v1/fee-structure", feeStructureRouter)
app.use("/api/vidyalaya/v1/notice", noticeRouter)
app.use("/api/vidyalaya/v1/academics", academicRouter)
app.use("/api/vidyalaya/v1/gallery", galleryRouter)
app.use("/api/vidyalaya/v1/admission", admissionRouter)
app.use("/api/vidyalaya/v1/inquiries", inquiriesRouter)


// last router where error handling
app.use(globalErrorHandler);


export default app;
