import { TQuestion } from "./question.interface";
import { Question } from "./question.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createQuestionIntoDB = async (payload: TQuestion) => {
    // Validate that the answer is one of the provided options
    if (!payload.options.includes(payload.answer)) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Answer must be one of the provided options'
        );
    }

    // Validate that options array has at least 2 and at most 4 options
    if (payload.options.length < 2 || payload.options.length > 4) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Question must have between 2 and 4 options'
        );
    }

    const result = await Question.create(payload);
    return result;
};

const getAllQuestionsFromDB = async (query: Record<string, unknown>) => {
    const {
        page = 1,
        limit = 10,
        level,
        createdBy,
        searchTerm,
        sortBy = 'createdAt',
        sortOrder = 'desc'
    } = query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Build filter object
    const filter: Record<string, unknown> = {};

    if (level) {
        filter.level = level;
    }

    if (createdBy) {
        filter.createdBy = createdBy;
    }

    if (searchTerm) {
        filter.$text = { $search: searchTerm as string };
    }

    // Build sort object
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    const questions = await Question.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNumber)
        .populate('createdBy', 'name email')
        .lean();

    const total = await Question.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNumber);

    return {
        questions,
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPage: totalPages
        }
    };
};


const getQuestionsByStepFromDB = async (step: number) => {
    let levels: string[] = [];

    switch (step) {
        case 1:
            levels = ['A1', 'A2'];
            break;
        case 2:
            levels = ['B1', 'B2'];
            break;
        case 3:
            levels = ['C1', 'C2'];
            break;
        default:
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Step must be 1, 2, or 3'
            );
    }

    const questions = await Question.find({ level: { $in: levels } })
        .lean();

    return questions;
};



export const QuestionServices = {
    createQuestionIntoDB,
    getAllQuestionsFromDB,
    getQuestionsByStepFromDB,
};
