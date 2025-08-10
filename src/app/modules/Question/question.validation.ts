import { z } from "zod";
import { QUESTION_LEVEL, COMPETENCIES } from "./question.constant";

const questionValidationSchema = z.object({
    body: z.object({
        question: z.string({
            invalid_type_error: 'Question must be a string',
            required_error: 'Question is required'
        }),
        options: z.array(z.string()).min(2, {
            message: 'Question must have at least 2 options'
        }).max(4, {
            message: 'Question cannot have more than 4 options'
        }),
        answer: z.string({
            invalid_type_error: 'Answer must be a string',
            required_error: 'Answer is required'
        }),
        level: z.enum(Object.values(QUESTION_LEVEL) as [string, ...string[]], {
            invalid_type_error: 'Level must be A1, A2, B1, B2, C1, or C2'
        }).optional().default(QUESTION_LEVEL.A1),
        competency: z.enum(Object.values(COMPETENCIES) as [string, ...string[]], {
            invalid_type_error: 'Competency must be one of the predefined competencies'
        }),
    })
});

export const questionValidation = {
    questionValidationSchema
}
