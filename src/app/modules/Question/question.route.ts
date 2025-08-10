import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { questionValidation } from './question.validation';
import { QuestionControllers } from './question.controller';

const router = express.Router();

// Create a new question
router.post(
    '/create',
    validateRequest(questionValidation.questionValidationSchema),
    QuestionControllers.createQuestion
);

// Get all questions with pagination, filtering, and sorting
router.get('/', QuestionControllers.getAllQuestions);


// Get questions by step (1=A1,A2, 2=B1,B2, 3=C1,C2)
router.get(
    '/step/:step',
    QuestionControllers.getQuestionsByStep
);

export const QuestionRoutes = router;