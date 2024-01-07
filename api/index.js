const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 3000;
const cors = require("cors");
const { log, error } = require("console");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken")

mongoose
  .connect("mongodb+srv://jean:jean@cluster0.06i1hf1.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error", error);
  });

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

const User = require("./models/user")
const Todo = require("./models/todo")

app.post("/register", async(req,res) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if(existingUser){
            console.log("Email already registered")
            return res.status(400).json({ message: "Email already registered" })
        }

        const newUser = new User({
            name,
            email,
            password,
        })

        await newUser.save()

        res.status(202).json({message: "User registered successfully"})
    } catch (error) {
        console.log("Error registering the user",error)
        res.status(500).json({message:"Registration failed"})
    }
})

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex")
    return secretKey
}

const secretKey = generateSecretKey()

app.post("/login",async(req,res) => {
    try {
        const{ email, password } = req.body

        const user = await User.findOne({ email })
        if(!user){
            return res.status(401).json({message: "Invalid email"})
        }

        if(user.password !== password){
            return res.status(401).json({message: "Invalid password"})
        }

        const token = jwt.sign({ userId:user._id }, secretKey)

        res.status(200).json((token))
    } catch (error) {
        console.log("Login failed", error)
        res.status(500).json({message:"Login failed"})
    }
})