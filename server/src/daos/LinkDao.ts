import mongoose, { Schema, Document } from "mongoose";

export interface LinkAttr {
    linkId: string;
    shortenedLink: string;
    longLink: string;
    createdAt: Date,
    authorId: string,
}

export interface LinkDocument extends Document, LinkAttr {}

const LinkSchema = new Schema<LinkAttr>(
    {
        linkId: { type: String, required: true, unique: true },
        shortenedLink: { type: String, required: true, unique: true },
        longLink: { type: String, required: true },
        authorId: { type: String },
    }, {
        timestamps: true,
    }
);

const link = mongoose.model<LinkDocument>("Link", LinkSchema);

export default link;
