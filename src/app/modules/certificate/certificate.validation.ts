import { z } from "zod";
import { QUESTION_LEVEL } from "../Question/question.constant";

const createCertificateValidationSchema = z.object({
    body: z.object({
        userId: z.string({
            invalid_type_error: "User ID must be a string",
            required_error: "User ID is required",
        }),
        levelAchieved: z.enum(
            Object.values(QUESTION_LEVEL) as [string, ...string[]],
            { invalid_type_error: "Level must be A1, A2, B1, B2, C1, or C2" }
        ),
        score: z.number({
            invalid_type_error: "Score must be a number",
            required_error: "Score is required",
        })
            .min(0, { message: "Score must be greater than 0" })
            .max(100, { message: "Score must be less than 100" }),
    }),
});

export const certificateValidation = {
    createCertificateValidationSchema,
};


