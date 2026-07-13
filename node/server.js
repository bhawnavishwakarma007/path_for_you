require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {

    try {

        await pool.query("SELECT 1");

        console.log("Database Connected");

        const server = app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });

        process.on("SIGTERM", () => {
            console.log("Stopping Server...");

            server.close(() => {
                process.exit(0);
            });
        });

    } catch (err) {

        console.error(err);

        process.exit(1);

    }

}

startServer();