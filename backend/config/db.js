const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Connected to Database');
    } catch (ex) {
        console.log(ex.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
