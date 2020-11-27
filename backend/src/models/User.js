import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

class User {
    GenerateToken() {
        const token = jwt.sign(
            { _id: this._id, },
            process.env.PRIVATEKEY
        );
        return token;
    }
}

UserSchema.loadClass(User);

export default mongoose.model("User", UserSchema);