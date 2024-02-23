const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("mongo db connected");
    } catch (err) {
        console.error(err);
        // exit process with failure.
        process.exit(1);
    }
}

module.exports = connectDB;