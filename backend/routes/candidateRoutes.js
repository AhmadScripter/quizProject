const express = require('express');
const { getCandidates, updateCandidate, loginCandidate, registerCandidate, removeCandidate, getCandidateById } = require('../controller/candidateController');
const adminAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getCandidates);
router.get('/:id', adminAuth, getCandidateById);
router.post('/register', adminAuth, registerCandidate);
router.put('/update/:id', adminAuth, updateCandidate);
router.delete('/remove/:id', adminAuth, removeCandidate);

router.post('/login', loginCandidate);

module.exports = router;