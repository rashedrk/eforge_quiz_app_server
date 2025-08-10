import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { QuestionServices } from "./question.service";

const createQuestion = catchAsync(async (req, res) => {
    const result = await QuestionServices.createQuestionIntoDB(req.body);

    sendResponse(res, {
        message: 'Question created successfully',
        data: result,
    });
});

const getAllQuestions = catchAsync(async (req, res) => {
    const result = await QuestionServices.getAllQuestionsFromDB(req.query);

    sendResponse(res, {
        message: 'Questions retrieved successfully',
        data: result.questions,
        meta: result.meta,
    });
});


const getQuestionsByStep = catchAsync(async (req, res) => {
    const { step } = req.params;
    const stepNumber = parseInt(step);

    if (isNaN(stepNumber)) {
        throw new Error('Step must be a valid number');
    }

    const result = await QuestionServices.getQuestionsByStepFromDB(stepNumber);

    sendResponse(res, {
        message: `Questions for step ${step} (${stepNumber === 1 ? 'A1, A2' : stepNumber === 2 ? 'B1, B2' : 'C1, C2'}) retrieved successfully`,
        data: result,
    });
});

export const QuestionControllers = {
    createQuestion,
    getAllQuestions,
    getQuestionsByStep,
};
