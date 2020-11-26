import mongoose from "mongoose";

const PartnerType = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
});

const Partner = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
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
        ref: "PartnerType",
        required: true,
    },
});

export default {
    Type: mongoose.model("PartnerType", PartnerType),
    Partner: mongoose.model("Partner", Partner),
};
