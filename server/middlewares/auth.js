const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require("../models/User");

// auth middleware
exports.auth = async(req, res, next) => {
    try{
        // fetch token
        // console.log("Inside middleware");
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");
        // console.log(token);
        // if token missing
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }

        // verify token
        try{ 
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("Decoded token -> " + decode);
            req.user = decode;
        }
        catch(err){
            console.log("Error in token decoding")
            return res.status(403).json({
                status: false,
                token,
                message: "Token is Invalid",
            })
        }
        next();

    }
    catch(err){
        console.log("Inside error")
        console.log("Error in auth middleware: " + err.message);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while validating the token",
        })
    }

}

// isStudent middleware
exports.isStudent = async function (req, res, next) {
    try{
        
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                status: false,
                message: "This is Protected Route For User Only",
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            status: false,
            message: "User role cannot be verified, please try again",
        })
    }
}

// isInstructor middleware
exports.isInstructor = async function (req, res, next) {
    try{
        
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                status: false,
                message: "This is Protected Route For Instructor Only",
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            status: false,
            message: "Instructor role cannot be verified, please try again",
        })
    }
}

// isAdmin middleware
exports.isAdmin = async function (req, res, next) {
    try{
        
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                status: false,
                message: "This is Protected Route For Admin Only",
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            status: false,
            message: "Admin role cannot be verified, please try again",
        })
    }
}