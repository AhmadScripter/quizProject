const express = require('express');
const { addCandidate, getCandidates, updateCandidate, deleteCandidate, loginCandidate } = require('../controller/candidateController');
const adminAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getCandidates);
router.post('/add', adminAuth, addCandidate);
router.put('/update/:id', adminAuth, updateCandidate);
router.delete('/delete/:id', adminAuth, deleteCandidate);

router.post('/login', loginCandidate);

module.exports = router;