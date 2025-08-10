import { model, Schema } from "mongoose";
import { TQuestion, QuestionModel } from "./question.interface";
import { COMPETENCIES, QUESTION_LEVEL } from "./question.constant";

const questionSchema = new Schema<TQuestion, QuestionModel>({
    question: {
        type: String,
        required: [true, 'Question is required'],
        trim: true,
    },
    options: {
        type: [String],
        required: [true, 'Options are required'],
    },
    answer: {
        type: String,
        required: [true, 'Answer is required'],
        trim: true,
    },
    level: {
        type: String,
        enum: {
            values: Object.values(QUESTION_LEVEL),
            message: 'Level must be either A1, A2, B1, B2, C1, or C2'
        },
        required: [true, 'Level is required'],
        default: QUESTION_LEVEL.A1
    },
    competency: {
        type: String,
        enum: {
            values: Object.values(COMPETENCIES),
            message: 'Competency must be one of the predefined competencies'
        },
        required: [true, 'Competency is required'],
    },
    createdBy: {
        type: String,
        required: [true, 'Creator ID is required'],
        ref: 'user'
    }
}, {
    timestamps: true,
    versionKey: false
});

// Index for better query performance
questionSchema.index({ level: 1, createdBy: 1 });

export const Question = model<TQuestion, QuestionModel>('question', questionSchema);
