const express = require('express');
const { addQuiz, getQuiz, updateQuiz, deleteQuiz, submitQuiz } = require('../controller/quizController');

const router = express.Router();

router.get('/', getQuiz);
router.post('/add', addQuiz);
router.put('/update/:id', updateQuiz);
router.delete('/delete/:id', deleteQuiz);

router.post('/submit', submitQuiz);

module.exports = router;