// src/middleware/injectionFirewall.js

// 🛡️ MALICIOUS PAYLOAD PATTERNS (Regex signatures matching common SQL/NoSQL vectors)
const INJECTION_PATTERNS = {
    // Detects SQL escape symbols, comments, union select requests, or rogue semicolons
    sqlInjection: /(\b(SELECT|UNION|INSERT|DELETE|UPDATE|DROP|ALTER)\b)|(['"];\s*--)|(--\s*$)/i,
    
    // Detects NoSQL operator injection hacks (like Mongo operators: $gt, $ne, $regex, $where)
    noSqlInjection: /(\$gt|\$ne|\$regex|\$where|\$gte|\$lte|\$and|\$or)/i
};

module.exports = function injectionFirewall(req, res, next) {
    const clientIp = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    let attackDetected = false;
    let flaggedVector = '';

    // Helper method to recursively audit and check string inputs for attack markers
    function sanitizeValue(value) {
        if (typeof value === 'string') {
            if (INJECTION_PATTERNS.sqlInjection.test(value)) {
                attackDetected = true;
                flaggedVector = `SQLi Signature: [ ${value} ]`;
            }
            if (INJECTION_PATTERNS.noSqlInjection.test(value)) {
                attackDetected = true;
                flaggedVector = `NoSQLi Operator: [ ${value} ]`;
            }
        } else if (typeof value === 'object' && value !== null) {
            // Check keys for NoSQL field modifications (e.g. { "$gt": "" })
            for (const key in value) {
                if (INJECTION_PATTERNS.noSqlInjection.test(key)) {
                    attackDetected = true;
                    flaggedVector = `NoSQLi Object Key Operator: [ ${key} ]`;
                }
                sanitizeValue(value[key]);
            }
        }
    }

    // Audit incoming data boundaries
    if (req.body) sanitizeValue(req.body);
    if (req.query) sanitizeValue(req.query);
    if (req.params) sanitizeValue(req.params);

    // 🚨 THREAT INTERCEPTED BLOCK: Terminate connection instantly if malicious signatures match
    if (attackDetected) {
        console.error(`\n🚨 [FIREWALL INTEL ALERT] MALICIOUS PARAMETERS DETECTED!`);
        console.error(`👤 SOURCE IP: ${clientIp}`);
        console.error(`⚡ THREAT VECTOR: ${flaggedVector}`);
        console.error(`🛑 ACTION: Connection dropped with Status 400.`);

        return res.status(400).json({
            error: "Security Rejection: Malicious or illegal query parameters intercepted.",
            incidentStatus: "FLAGGED_AND_LOGGED",
            timestamp: new Date().toISOString()
        });
    }

    // Otherwise, clean packets clear validation—wave them safely into internal application rooms
    next();
};
