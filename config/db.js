const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    autoIndex: true, // Enable auto-indexing for easier querying, ensure indexes are created automatically
    useNewUrlParser: true,  // Updated for compatibility with MongoDB drivers
    useUnifiedTopology: true, // Improved connection handling
});

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

module.exports = mongoose;