// index.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const injectionFirewall = require('./src/middleware/injectionFirewall');

const app = express();
const PORT = process.env.PORT || 3080;

app.use(helmet());
app.use(express.json());

// 🛡️ PERIMETER SECURITY GATEWAY: Mount the firewall globally to scrub every request line!
app.use(injectionFirewall);

// Public input endpoint destination (Like a database login or search bar field room)
app.post('/api/v1/data/query', (req, res) => {
    res.status(200).json({
        status: "success",
        msg: "Input successfully sanitized. Data processed inside secure internal tables.",
        echoReceived: req.body
    });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`\n🛡️ ==================================================`);
        console.log(`🚀 INJECTION DETECTOR FIREWALL ONLINE ON PORT ${PORT}!`);
        console.log(`🛡️ ==================================================`);
    });
}

module.exports = app;
