import express from 'express';
import cors from 'cors';
import { connectToDB } from './config/db.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "./models/user.model.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express(); 
const PORT = process.env.PORT || 5000;  

// Middlewares

app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World2!');
});

//signup
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;
    // console.log(username, email, password );
    try{
        if(!username || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
        const emailExists=await User.findOne({email});
        if(emailExists){
            return res.status(409).json({ message: "Email already in use" });
        }
        const usernameExists=await User.findOne({username});
        if(usernameExists){
            return res.status(409).json({ message: "Username already in use" });
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const userDoc=await User.create({ username, email, password:hashedPassword });


        //JWT 
        if(userDoc){
            const token=jwt.sign({id:userDoc._id}, process.env.JWT_SECRET, {expiresIn:"7d"});
            res.cookie("token", token, { httpOnly:true, secure:process.env.NODE_ENV==="production", sameSite:"strict", maxAge:7*24*60*60*1000, // 7 days
            });
        }
        res.status(200).json({ user:userDoc, message: 'User signed up successfully!' });
    }
    catch(error){
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    
});

//login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password );
    try{
        if(!username || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
        const userDoc=await User.findOne({username});
        if(!userDoc){
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordCorrect=await bcrypt.compare(password, userDoc.password);
        if(!isPasswordCorrect){
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        //jwt
        if(userDoc){
            const token=jwt.sign({id:userDoc._id}, process.env.JWT_SECRET, {expiresIn:"7d"});
            res.cookie("token", token, { httpOnly:true, secure:process.env.NODE_ENV==="production", sameSite:"strict", maxAge:7*24*60*60*1000, // 7 days
            });
        }
        res.status(200).json({ user:userDoc, message: 'User logged in successfully!' });
    }
    catch(error){
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//fetch user
app.get("/api/fetch-user", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const userDoc = await User.findById(decoded.id).select("-password");
    if (!userDoc) {
      return res.status(400).json({ message: "No user found." });
    }
    res.status(200).json({ user: userDoc });
  } catch (error) {
    console.log("Error in fetching user: ", error.message);
    return res.status(400).json({ message: error.message });
  }
});

//logout
app.post("/api/logout", async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});


// Start server after DB connection
connectToDB()
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB:', err);
  });
