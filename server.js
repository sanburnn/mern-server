const express = require('express');
const Mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("MongoDB connected"))
//     .catch((err) => console.log(err));

 Mongoose.connect('mongodb://localhost:27017/')
    .then(() => console.log('DB Connected'))
    .catch((err) => {
        console.log('DBERROR', err)
    })

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
