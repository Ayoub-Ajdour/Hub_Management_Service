require("dotenv").config();
const express = require("express");
const promClient = require("prom-client");  // Import prom-client
require("./config/db"); // Ensure MongoDB is connected
const hubRoutes = require("./routes/hubRoutes");

const app = express();

// Create a Registry to store the metrics
const register = new promClient.Registry();

// Create some example metrics
const requestCounter = new promClient.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests made',
    labelNames: ['method', 'route', 'status_code'],
});

const durationHistogram = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Histogram of HTTP request durations in seconds',
    buckets: [0.1, 0.5, 1, 2, 5, 10],  // Custom buckets
});

// Register the metrics
register.registerMetric(requestCounter);
register.registerMetric(durationHistogram);

// Middleware to count requests and measure durations
app.use((req, res, next) => {
    const start = Date.now();  // Measure the start time

    res.on('finish', () => {  // When the response finishes, record metrics
        const duration = (Date.now() - start) / 1000;  // Duration in seconds
        durationHistogram.observe(duration);
        requestCounter.inc({ method: req.method, route: req.path, status_code: res.statusCode });
    });

    next();
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

// Expose Prometheus metrics
app.get("/metrics", async (req, res) => {
    try {
        res.set("Content-Type", register.contentType);
        res.end(await register.metrics());  // Return the metrics
    } catch (err) {
        res.status(500).send(err);
    }
});

// Middleware to parse JSON
app.use(express.json());
app.use("/hubs", hubRoutes);

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
