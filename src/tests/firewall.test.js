// src/tests/firewall.test.js
const request = require('supertest');
const app = require('../../index');

describe('🕵️‍♂️ Automated Penetration Exploitation & Firewall Verification Suite', () => {

    beforeAll(() => {
        process.env.NODE_ENV = 'test';
    });

    it('🟢 SHOULD accept and process clean, standard username and text input values smoothly', async () => {
        const response = await request(app)
            .post('/api/v1/data/query')
            .send({ username: "esosa_dev", comment: "Hello secure server world!" });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
    });

    it('🛑 SHOULD intercept classical SQL Injection escape bypass scripts and reject with Status 400', async () => {
        const response = await request(app)
            .post('/api/v1/data/query')
            .send({ username: "admin' OR '1'='1'; --", password: "arbitraryPassword" });

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('Security Rejection');
        expect(response.body.incidentStatus).toBe('FLAGGED_AND_LOGGED');
    });

    it('🛑 SHOULD intercept malicious NoSQL Operator Query payloads and drop connection blocks', async () => {
        const response = await request(app)
            .post('/api/v1/data/query')
            .send({ username: { "$ne": null }, password: "randomPassword" });

        expect(response.status).toBe(400);
        expect(response.body.incidentStatus).toBe('FLAGGED_AND_LOGGED');
    });
});
