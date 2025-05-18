const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ message: 'Admin not found' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ message: 'Password incorrect' });

  const payload = { id: admin._id, email: admin.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

  res.json({ token, message: 'Login successful' });
};

module.exports = { adminLogin };
