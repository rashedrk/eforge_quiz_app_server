import { Model } from "mongoose";
import { QUESTION_LEVEL } from "../Question/question.constant";

export type TCertificateLevel = keyof typeof QUESTION_LEVEL;

export type TCertificate = {
    userId: string;
    levelAchieved: TCertificateLevel;
    score: number;
};

export interface CertificateModel extends Model<TCertificate> { }


