const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to MongoDb Database ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`Mongodb Database Error ${error}`)
    }
}
module.exports = connectDB