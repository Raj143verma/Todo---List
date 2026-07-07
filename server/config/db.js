const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://rajvermause_db_user:cXSK20iMJ1S9GfIP@todo-saas.vjj2mhq.mongodb.net/todo-saas');
    console.log(`MongoDB Connected:`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
