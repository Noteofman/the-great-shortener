import bcrypt from 'bcrypt';
import mongoose, { Schema, Document } from "mongoose";
import {pwdSaltRounds} from "@shared/constants";

export interface UserAttr {
    email: string;
    name: string;
    password: string;
}

export interface UserDocument extends Document, UserAttr {}

const UserSchema = new Schema<UserAttr>(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
    }, {
        toObject: {
            versionKey: false,
            transform: function (doc, ret) {
                delete ret.password;
            }
        },
    }
);

UserSchema.pre("save", async function (complete) {

    if (this.isModified("password")) {

        const hashedPassword = await bcrypt.hash(
            this.get("password"),
            await bcrypt.genSalt(pwdSaltRounds)
        );

        this.set("password", hashedPassword);
    }

    complete();
});

const user = mongoose.model<UserDocument>("User", UserSchema);

export default user;
