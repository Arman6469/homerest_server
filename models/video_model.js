const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Video = new Schema({
    url: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Video", Video)