const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/data';

const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected");

    try {
        const fetched_Data = mongoose.connection.db.collection("food_items");
        const data = await fetched_Data.find({}).toArray();

        const food_categories = mongoose.connection.db.collection("food_categories");
        const catData = await food_categories.find({}).toArray();

        global.food_items = data;
        global.food_categories = catData;

    } catch (err) {
        console.log("Unexpected error:", err);
    }
};

module.exports = mongoDB;
