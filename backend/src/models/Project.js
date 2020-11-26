import mongoose from "mongoose";

const Project = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        default: "",
    },
    highlight: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("Project", Project);