/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { QUESTION_LEVEL, COMPETENCIES } from "./question.constant";

export type TQuestionLevel = keyof typeof QUESTION_LEVEL;
export type TCompetency = keyof typeof COMPETENCIES;

export type TQuestion = {
    question: string;
    options: string[];
    answer: string;
    level: TQuestionLevel;
    competency: TCompetency;
    createdBy: string;
}

export interface QuestionModel extends Model<TQuestion> { }
