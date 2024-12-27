const hubService = require("../services/hubService");

exports.getAllHubs = async (req, res) => {
    try {
        const hubs = await hubService.getAllHubs();
        res.status(200).json(hubs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch hubs" });
    }
};

exports.getHubById = async (req, res) => {
    const hub = await hubService.getHubById(req.params.id);
    hub ? res.status(200).json(hub) : res.status(404).json({ error: "Hub not found" });
};

exports.getHubByName = async (req, res) => {
    try {
        const hub = await hubService.getHubByName(req.params.name);
        hub ? res.status(200).json(hub) : res.status(404).json({ error: "Hub not found" });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch hub by name" });
    }
};

exports.createHub = async (req, res) => {
    try {
        const hub = await hubService.createHub(req.body);
        res.status(201).json(hub);
    } catch (error) {
        res.status(500).json({ error: "Failed to create hub" });
    }
};

exports.deleteHub = async (req, res) => {
    const deleted = await hubService.deleteHub(req.params.id);
    deleted
        ? res.status(204).send()
        : res.status(404).json({ error: "Hub not found or could not be deleted" });
};
