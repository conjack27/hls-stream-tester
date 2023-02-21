require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

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

// middleware
app.use(express.json());

app.use(
    cors({
        origin: "http://127.0.0.1:5500",
    })
);
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
    console.log("NEw url added");
    try {
        const newVideoURL = await videoURL.save();
        res.status(201).json(newVideoURL);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get("/latest", async (req, res) => {
    try {
        const latestVideoURL = await VideoURL.findOne()
            .sort({ _id: -1 })
            .limit(1);
        res.json(latestVideoURL);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete("/latest", async (req, res) => {
    try {
        const latestVideoURL = await VideoURL.findOneAndDelete(
            {},
            { sort: { createdAt: -1 } }
        );
        res.json(latestVideoURL);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(3000, () => console.log("Server started on port 3000"));
