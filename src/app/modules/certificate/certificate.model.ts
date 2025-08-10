import { model, Schema } from "mongoose";
import { TCertificate, CertificateModel } from "./certificate.interface";
import { QUESTION_LEVEL } from "../Question/question.constant";

const certificateSchema = new Schema<TCertificate, CertificateModel>(
    {
        userId: {
            type: String,
            required: [true, "User ID is required"],
            ref: "user",
            trim: true,
        },
        levelAchieved: {
            type: String,
            enum: {
                values: Object.values(QUESTION_LEVEL),
                message: "Level must be either A1, A2, B1, B2, C1, or C2",
            },
            required: [true, "Level is required"],
        },
        score: {
            type: Number,
            required: [true, "Score is required"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Enforce one certificate per user
certificateSchema.index({ userId: 1 }, { unique: true });

export const Certificate = model<TCertificate, CertificateModel>("certificate", certificateSchema);


