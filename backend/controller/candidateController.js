const Candidate = require('../models/candidate');
const jwt = require('jsonwebtoken');

// Add a new candidate
const registerCandidate = async (req, res) => {
    const { cnic, name, batch, reg, password } = req.body;

    if (!cnic || !name || !batch || !reg || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const existing = await Candidate.findOne({ $or: [{ cnic }, { reg }] });
        if (existing) {
            return res.status(400).json({ message: 'Candidate with this CNIC or registration already exists.' });
        }

        const candidate = new Candidate({ cnic, name, batch, reg, password });
        await candidate.save();
        res.status(201).json({ message: 'Candidate added successfully', candidate });
    } catch (err) {
        console.error('Error adding candidate:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all candidates
const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (err) {
        console.error('Error fetching candidates:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single candidate by ID
const getCandidateById = async (req, res) => {
    const { id } = req.params;

    try {
        const candidate = await Candidate.findById(id);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (err) {
        console.error('Error fetching candidate:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update candidate by ID
const updateCandidate = async (req, res) => {
    const { id } = req.params;
    const { cnic, name, batch, reg, password } = req.body;

    if (!cnic || !name || !batch || !reg || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const conflict = await Candidate.findOne({
            _id: { $ne: id },
            $or: [{ cnic }, { reg }],
        });
        if (conflict) {
            return res.status(400).json({ message: 'Another candidate with this CNIC or registration exists.' });
        }

        const updatedCandidate = await Candidate.findByIdAndUpdate(
            id,
            { cnic, name, batch, reg, password },
            { new: true }
        );

        if (!updatedCandidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        res.status(200).json({ message: 'Candidate updated successfully', updatedCandidate });
    } catch (err) {
        console.error('Error updating candidate:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete candidate by ID
const removeCandidate = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Candidate.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (err) {
        console.error('Error deleting candidate:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// candidate login
const loginCandidate = async (req, res) => {
  const { reg, password } = req.body;

  try {
    const candidate = await Candidate.findOne({ reg, password });

    if (!candidate) {
      return res.status(404).json({ message: "Invalid registration number or password" });
    }

    const candidateToken = jwt.sign(
      { id: candidate._id, reg: candidate.reg },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    console.log("Generated candidateToken:", candidateToken);

    res.status(200).json({
      message: "Login successful",
      candidate,
      token: candidateToken
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerCandidate, getCandidates, getCandidateById, updateCandidate, removeCandidate, loginCandidate };