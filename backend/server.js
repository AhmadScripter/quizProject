require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const quizRoutes = require('./routes/quizRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const connectDB = require("./config/db");
const Admin = require('./models/admin');
const app = express();

connectDB().then(() => {
    createDefaultAdmin();
});

app.use(express.json());
app.use(cors());

app.use("/api/auth", adminAuthRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/candidate', candidateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function createDefaultAdmin() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;    

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        console.log('Default admin already exists');
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({ email, password: hashedPassword });
    console.log('Default admin created');
}
