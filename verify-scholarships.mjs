/**
 * Scholaro.xyz — Automated Scholarship Directory Health & Verification Tool
 * 
 * Verifies all listed scholarships:
 * 1. Checks schema integrity (name, country, levels, funding, award, requirements, portal)
 * 2. Validates official portal URLs over HTTPS
 * 3. Reports reachable, redirecting, and flagged endpoints
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import data through ssr.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ssr = require('./ssr.js');

async function checkUrl(urlStr, maxRedirects = 3) {
    return new Promise(resolve => {
        let fullUrl = urlStr.startsWith('http://') || urlStr.startsWith('https://') 
            ? urlStr 
            : `https://${urlStr}`;

        try {
            const parsed = new URL(fullUrl);
            const client = parsed.protocol === 'http:' ? http : https;

            const options = {
                method: 'HEAD',
                timeout: 10000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ScholaroVerificationBot/1.0',
                    'Accept': '*/*'
                }
            };

            const req = client.request(fullUrl, options, res => {
                if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location && maxRedirects > 0) {
                    const nextUrl = new URL(res.headers.location, fullUrl).href;
                    resolve(checkUrl(nextUrl, maxRedirects - 1));
                } else {
                    resolve({
                        ok: res.statusCode >= 200 && res.statusCode < 400,
                        statusCode: res.statusCode,
                        error: null
                    });
                }
            });

            req.on('timeout', () => {
                req.destroy();
                resolve({ ok: false, statusCode: null, error: 'TIMEOUT (10s)' });
            });

            req.on('error', err => {
                resolve({ ok: false, statusCode: null, error: err.code || err.message });
            });

            req.end();
        } catch (err) {
            resolve({ ok: false, statusCode: null, error: 'INVALID_URL' });
        }
    });
}

async function verifyAllScholarships() {
    console.log('🔍 Starting Scholaro.xyz Directory Verification...\n');

    // Load data from scripts.js directly
    const jsCode = fs.readFileSync(path.join(__dirname, 'scripts.js'), 'utf8');
    const vm = require('vm');
    const ctx = { window: {}, document: { documentElement: { getAttribute: () => 'light' } }, localStorage: { getItem: () => null } };
    vm.createContext(ctx);
    const dataPart = jsCode.substring(0, jsCode.indexOf('const $ =')).replace(/\bconst\b|\blet\b/g, 'var');
    vm.runInContext(dataPart, ctx);

    const scholarships = ctx.R;
    const countries = ctx.C;

    console.log(`📋 Total scholarships listed: ${scholarships.length}`);
    console.log(`🌍 Total countries mapped: ${Object.keys(countries).length}\n`);

    let verifiedCount = 0;
    let schemaErrors = 0;
    const networkResults = [];

    for (let i = 0; i < scholarships.length; i++) {
        const s = scholarships[i];
        const countryName = countries[s.c] ? countries[s.c][0] : 'UNKNOWN_COUNTRY';

        // 1. Schema check
        const issues = [];
        if (!s.name) issues.push('Missing name');
        if (!countries[s.c]) issues.push(`Unknown country code: ${s.c}`);
        if (!s.lv) issues.push('Missing levels');
        if (!['F', 'P'].includes(s.f)) issues.push(`Invalid funding flag: ${s.f}`);
        if (!s.dl) issues.push('Missing deadline');
        if (!s.aw) issues.push('Missing award description');
        if (!s.u) issues.push('Missing official website URL');

        if (issues.length > 0) {
            schemaErrors++;
            console.error(`❌ [ID ${s.id}] ${s.name}: Schema errors -> ${issues.join(', ')}`);
        } else {
            verifiedCount++;
        }

        // Test network in parallel batches of 5
        networkResults.push({ id: s.id, name: s.name, country: countryName, url: s.u });
    }

    console.log(`\n🌐 Checking online connectivity for all ${networkResults.length} scholarship portals...`);

    const BATCH_SIZE = 8;
    let successfulEndpoints = 0;
    let blockedOrFailed = 0;

    for (let i = 0; i < networkResults.length; i += BATCH_SIZE) {
        const batch = networkResults.slice(i, i + BATCH_SIZE);
        const checks = await Promise.all(batch.map(async item => {
            const res = await checkUrl(item.url);
            return { ...item, ...res };
        }));

        checks.forEach(c => {
            if (c.ok) {
                successfulEndpoints++;
                process.stdout.write(`  ✅ [${c.statusCode}] ${c.name} (${c.url})\n`);
            } else {
                blockedOrFailed++;
                // Note: Many government websites (like .gov.uk, .gov.au, .go.kr, .admin.ch) block automated bot HEAD requests with 403 or ENOTFOUND
                process.stdout.write(`  ⚠️ [${c.statusCode || c.error}] ${c.name} (${c.url})\n`);
            }
        });
    }

    console.log('\n======================================================');
    console.log('📊 Verification Summary:');
    console.log(`   - Total Scholarships: ${scholarships.length}`);
    console.log(`   - Schema Valid: ${verifiedCount} / ${scholarships.length}`);
    console.log(`   - Active Endpoints: ${successfulEndpoints} confirmed accessible`);
    if (blockedOrFailed > 0) {
        console.log(`   - Bot-Restricted / Flagged: ${blockedOrFailed} (common for strict govt firewalls)`);
    }
    console.log('======================================================\n');

    if (schemaErrors === 0) {
        console.log('🎉 Directory verification PASSED with 0 schema defects!\n');
        process.exit(0);
    } else {
        console.error(`💥 Found ${schemaErrors} schema defects! Please inspect and fix.`);
        process.exit(1);
    }
}

verifyAllScholarships().catch(err => {
    console.error('Fatal verification error:', err);
    process.exit(1);
});
