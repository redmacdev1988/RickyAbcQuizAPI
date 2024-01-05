
import { getUsers } from "../controllers/getUsers";
import { createQuizController } from "../controllers/createQuizController";

const express  = require('express');
const router = express.Router();


router.get('/users', getUsers); // √ 
router.post('/createQuiz', createQuizController); // √

// router.get('/:id', getCustomerController);

module.exports = router;