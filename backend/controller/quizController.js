const Quiz = require('../models/quiz');
const Candidate = require('../models/candidate');

// Add a new quiz
const addQuiz = async (req, res) => {
    const { question, options, answer } = req.body;

    if (!question || !options || !answer || options.length < 2) {
        return res.status(400).json({ message: 'Question, at least 2 options, and answer are required.' });
    }

    if (!options.includes(answer)) {
        return res.status(400).json({ message: 'Answer must be one of the options.' });
    }

    try {
        const newQuiz = new Quiz({ question, options, answer });
        await newQuiz.save();
        res.status(201).json({ message: 'Quiz added successfully.' });
    } catch (err) {
        console.error('Error adding quiz:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all quizzes
const getQuiz = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (err) {
        console.error('Error fetching quizzes:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Quiz by id
const getQuizByID= async (req,res) =>{
    const {id} = req.params.id;
    try {
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(quiz);
    } catch (err) {
        console.error('Error fetching question:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
}

// Update a quiz by ID
const updateQuiz = async (req, res) => {
    const { id } = req.params;
    const { question, options, answer } = req.body;

    if (!question || !options || !answer || options.length < 2) {
        return res.status(400).json({ message: 'Question, at least 2 options, and answer are required.' });
    }

    if (!options.includes(answer)) {
        return res.status(400).json({ message: 'Answer must be one of the options.' });
    }

    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            id,
            { question, options, answer },
            { new: true }
        );

        if (!updatedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(200).json({ message: 'Quiz updated successfully', updatedQuiz });
    } catch (err) {
        console.error('Error updating quiz:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a quiz by ID
const deleteQuiz = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(id);

        if (!deletedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (err) {
        console.error('Error deleting quiz:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const submitQuiz = async (req, res) => {
    const { reg, answers } = req.body;

    try {
        const candidate = await Candidate.findOne({ reg });
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        const quizzes = await Quiz.find();
        let score = 0;

        quizzes.forEach((quiz, index) => {
            if (answers[index] && answers[index] === quiz.answer) {
                score++;
            }
        });

        candidate.score = score;
        await candidate.save();

        res.status(200).json({ message: "Quiz submitted", score });

    } catch (err) {
        console.error("Submit quiz error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { addQuiz, getQuiz, getQuizByID, updateQuiz, deleteQuiz, submitQuiz };