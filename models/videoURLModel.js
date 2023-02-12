const mongoose = require("mongoose");

const videoURLSchema = new mongoose.Schema({
    videoURL: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("video-urls", videoURLSchema);
