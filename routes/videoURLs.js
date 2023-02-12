const express = require("express");
const router = express.Router();
const VideoURL = require("../models/videoURLModel");

// Getting all
router.get("/", async (req, res) => {
    try {
        const videoURLs = await VideoURL.find();
        console.log(req);
        res.json(videoURLs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One
router.get("/:id", getVideoURL, (req, res) => {
    res.json(res.videoURL);
});

// Creating one
router.post("/", async (req, res) => {
    const videoURL = new VideoURL({
        url: req.body.videoURL,
    });
    try {
        const newVideoURL = await videoURL.save();
        res.status(201).json(newVideoURL);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One
router.patch("/:id", getVideoURL, async (req, res) => {
    if (req.body.name != null) {
        res.videoURL.videoURL = req.body.videoURL;
    }

    try {
        const updatedVideoURL = await res.videoURL.save();
        res.json(updatedVideoURL);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One
router.delete("/:id", getVideoURL, async (req, res) => {
    try {
        await res.videoURL.remove();
        res.json({ message: "Deleted VideoURL" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getVideoURL(req, res, next) {
    let videoURL;

    try {
        videoURL = await VideoURL.findById(req.params.id);
        if (videoURL == null) {
            return res.status(404).json({ message: "Cannot find videoURL" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.videoURL = videoURL;
    next();
}

module.exports = router;
