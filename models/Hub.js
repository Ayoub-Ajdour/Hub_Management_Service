const mongoose = require("mongoose");

const HubSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Custom ID (e.g., HUB-1)
    name: { type: String, required: true },
    region: { type: String, required: true },
    status: {
        type: String,
        enum: ["PENDING", "IN_PROGRESS", "COMPLETED", "ACTIVE", "INACTIVE"],
        required: true,
    },
}, { timestamps: true }); // Optionally add timestamps to track created/updated times

// Ensures that a collection will be created with the defined schema if it doesn't exist
module.exports = mongoose.model("Hub", HubSchema);