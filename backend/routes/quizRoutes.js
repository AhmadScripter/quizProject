const express = require('express');
const { addQuiz, getQuiz, updateQuiz, deleteQuiz, submitQuiz, getQuizByID } = require('../controller/quizController');
const adminAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getQuiz);
router.get('/:id', adminAuth, getQuizByID)
router.post('/add', adminAuth, addQuiz);
router.put('/update/:id', adminAuth, updateQuiz);
router.delete('/delete/:id', adminAuth, deleteQuiz);

router.post('/submit', submitQuiz);

module.exports = router;