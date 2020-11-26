import mongoose from "mongoose";

const PeopleType = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const People = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    lattes: {
        type: String,
        required: false,
        default: "",
    },
    git: {
        type: String,
        required: false,
        default: "",
    },
    photo: {
        type: String,
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PeopleType",
        required: true,
    },
});

export default {
    PeopleType: mongoose.model("PeopleType", PeopleType),
    People: mongoose.model("People", People),
};