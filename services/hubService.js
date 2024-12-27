const Hub = require("../models/Hub");

class HubService {
    async getAllHubs() {
        return await Hub.find();
    }

    async getHubById(id) {
        try {
            return await Hub.findById(id);
        } catch (error) {
            console.error("Error fetching hub by ID:", error.message);
            return null;
        }
    }

    async getHubByName(name) {
        return await Hub.findOne({ name });
    }

    async createHub(hubData) {
        const hub = new Hub(hubData);
        return await hub.save();
    }

    async deleteHub(id) {
        try {
            return await Hub.findByIdAndDelete(id);
        } catch (error) {
            console.error("Error deleting hub:", error.message);
            return null;
        }
    }
}

module.exports = new HubService();
