require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("connected");
    } catch (error) {
        console.error(error);
    }
}

connectToDatabase();

// Define a schema
const videoURLSchema = new mongoose.Schema({
    videoURL: {
        type: String,
        required: true,
    },
});

// Create a model
const VideoURL = mongoose.model("video-urls", videoURLSchema);

// Use the model to interact with the database
app.get("/", async (req, res) => {
    try {
        const videoURLs = await VideoURL.find();
        res.json(videoURLs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post("/", async (req, res) => {
    const videoURL = new VideoURL({
        videoURL: req.body.videoURL,
    });
    try {
        const newVideoURL = await videoURL.save();
        res.status(201).json(newVideoURL);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(3000, () => console.log("Server started on port 3000"));
