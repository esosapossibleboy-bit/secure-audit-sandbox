# 🛡️ Injection Interception Firewall & Penetration Auditing Sandbox

Welcome to the **Injection Interception Firewall & Penetration Auditing Sandbox**! This is a production-grade, standalone **Web Application Firewall (WAF)** middleware framework built on Node.js and Express. It acts as an automated network perimeter filter that actively scrubs incoming request streams for structural injection exploits before they hit backend logic boundaries or touch database systems.

This project demonstrates a deep understanding of standard defensive security operations, matching parameters from the OWASP Top 10 security guidelines.

---

## 🗺️ System Architecture Map

```text
secure-audit-sandbox/            # 🚀 Master Penetration Auditing Playground Root
├── index.js                     # Main Production Server Core & Express Entry Gate
├── package.json                 # System Dependency Script Sheet & Test Commands
├── .gitignore                   # Safety Exclusion Shield
└── src/
    ├── middleware/
    │   └── injectionFirewall.js # 🛡️ THE AUTOMATED CORE INJECTION FIREWALL MIDDLEWARE
    └── tests/
        └── firewall.test.js     # 🔬 Automated Penetration Exploitation Test Suite
```

---

## 🔬 Core Security Implementations

1. **Deep Payload Recursive Scanning:** Recursively parses incoming request boundaries (`req.body`, `req.query`, and `req.params`) to examine both primitive string parameters and complex object keys for hidden injection signatures.
2. **SQLi Signature Detection Matrices:** Employs high-entropy regex anchors to scan for escape sequences, trailing comment modifiers (`--`), and common query keyword sequences (`SELECT`, `UNION SELECT`, `DROP TABLE`, `ALTER`) used in SQL injection authentication bypasses.
3. **NoSQL Query Operator Neutralization:** Intercepts malicious MongoDB logical conditional query manipulation vectors (`$gt`, `$ne`, `$regex`, `$where`) to insulate database structures from structural query manipulation attacks.
4. **Autonomous Forensic Threat Logging:** Captures critical tactical audit trail metrics—such as the offender's source IP address and the precise threat vector string parameters—for instant security incident logging inside terminal streams.

---

## 🏃‍♂️ Operational Launch Manual

### 🏰 1. Launching the Protected Production Microservice
Open your terminal partition inside your workspace folder floor and turn the microservice live:

```bash
# Sync structural system dependencies
npm install

# Launch production injection detector firewall live on Port 3080
npm start
```

### 🔬 2. Running the Automated Penetration Audit Test Suite
Execute the testing harness to launch automated cyber-attack simulations against the firewall core:

```bash
npm test
```
The automated robot armies will intentionally send common SQL injection commands and NoSQL malicious structures to mathematically prove that your defense block intercepts intruders cleanly with Status Code `400`!

---

## 🤖 Verified Test Matrix Metrics
*   `✓ SHOULD accept and process clean, standard username and text input values smoothly`
*   `✓ SHOULD intercept classical SQL Injection escape bypass scripts and reject with Status 400`
*   `✓ SHOULD intercept malicious NoSQL Operator Query payloads and drop connection blocks`
