const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const courseRoutes = require('./routes/Course');
const paymentRoutes = require('./routes/Payments');
const profileRoutes = require('./routes/Profile');
const contactUsRoute = require("./routes/Contact");

const cookieParser = require('cookie-parser');
const database = require('./config/database');
const {cloudinaryConnect} = require('./config/cloudinary');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

// -----> find port
dotenv.config();
const PORT = process.env.PORT || 4000;

// ------> middlewares
app.use(express.json());
app.use(cookieParser());
// cors hmare frontend ki request ke according backend ko entrtain krne ke kaam aata hai
app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)

// ------> database connect
database.connect();

// -----> cloudinary connect
cloudinaryConnect();

// ------> mount routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach", contactUsRoute)

// default routes
app.get("/",(req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running..."
    })
})

// activate the server
app.listen(PORT, () => {
    console.log("App  is running on port " + PORT);
})
