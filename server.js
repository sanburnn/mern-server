const express = require('express');
const Mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const emailRoutes = require('./routes/email');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

 Mongoose.connect('mongodb://localhost:27017/mern')
    .then(() => console.log('DB Connected'))
    .catch((err) => {
        console.log('DBERROR', err)
    })

app.use('/api/auth', authRoutes);
app.use('/api/emails', emailRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
