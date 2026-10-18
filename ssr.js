/**
 * Scholaro.xyz — Server-Side Rendering (SSR) & Pre-rendering Engine
 * 
 * Provides:
 * 1. Build-time SSR pre-rendering into index.html
 * 2. Runtime SSR HTTP server for dynamic URL query params & SEO bots
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// Extract Scholarship Data and Definitions directly from scripts.js
function loadScholarshipData() {
    const jsCode = fs.readFileSync(path.join(__dirname, 'scripts.js'), 'utf8');
    const vm = require('vm');
    const ctx = { window: {}, document: { documentElement: { getAttribute: () => 'light' } }, localStorage: { getItem: () => null } };
    vm.createContext(ctx);

    const dataPart = jsCode.substring(0, jsCode.indexOf('const $ =')).replace(/\bconst\b|\blet\b/g, 'var');
    vm.runInContext(dataPart, ctx);

    return {
        C: ctx.C,
        CUR: ctx.CUR,
        CW: ctx.CW,
        DEV: ctx.DEV,
        R: ctx.R,
        DOM: ctx.DOM,
        FD: ctx.FD,
        PL: ctx.PL,
        DP: ctx.DP
    };
}

const DATA = loadScholarshipData();
const LV = { B: "Bachelor's", M: "Master's", P: "PhD" };

// Server-Side Rendering Function
function renderPageToString(options = {}) {
    const origin = options.origin || "BD";
    const searchQuery = (options.q || "").trim().toLowerCase();
    const destFilter = options.dst ? (Array.isArray(options.dst) ? options.dst : [options.dst]) : [];
    const sortMode = options.sort || "default";

    const ok = s => s.c !== origin && (s.o === "cw" ? DATA.CW.includes(origin) : s.o === "dev" ? DATA.DEV.includes(origin) : s.o === "ful" ? origin !== "US" : true);
    
    let list = DATA.R.filter(ok);

    if (destFilter.length > 0) {
        list = list.filter(s => destFilter.includes(s.c));
    }

    if (searchQuery) {
        list = list.filter(s => {
            const countryName = (DATA.C[s.c] ? DATA.C[s.c][0] : "").toLowerCase();
            return s.name.toLowerCase().includes(searchQuery) || countryName.includes(searchQuery);
        });
    }

    // Sort list
    if (sortMode === "name") {
        list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMode === "deadline") {
        list.sort((a, b) => a.dl.localeCompare(b.dl));
    } else {
        // default: Region, Country, Name
        list.sort((a, b) => {
            const regA = DATA.C[a.c] ? DATA.C[a.c][3] : "";
            const regB = DATA.C[b.c] ? DATA.C[b.c][3] : "";
            return regA.localeCompare(regB) || a.c.localeCompare(b.c) || a.name.localeCompare(b.name);
        });
    }

    // 1. Render Scholarship Cards HTML
    let cardsHtml = "";
    let lastRegion = "";
    list.forEach(s => {
        const country = DATA.C[s.c] || ["Unknown", 0, 0, "Global", s.c, 4];
        const region = country[3];
        if (sortMode === "default" && region !== lastRegion) {
            cardsHtml += `                <div class="rg">${region.toUpperCase()}</div>\n`;
            lastRegion = region;
        }

        cardsHtml += `                <div class="card" data-i="${s.id}" tabindex="0" role="button" aria-expanded="false" aria-label="${s.name} scholarship details">
                    <div class="card-header-line">
                        <h3>${s.name}</h3>
                        <div class="card-header-actions">
                            <button type="button" class="btn-card-fav" data-fav="${s.id}" title="Save to shortlist" aria-label="Favorite">🤍</button>
                            <button type="button" class="card-expand-toggle" title="Expand details" aria-label="Expand details" aria-expanded="false">▼</button>
                        </div>
                    </div>
                    <div class="card-meta">
                        <span class="tag ${s.f}">${s.f === "F" ? "Fully Funded" : "Partial"}</span>
                        ${[...s.lv].map(x => `<span class="tag L">${LV[x]}</span>`).join("")}
                        <span class="meta-country">📍 ${country[0]}</span>
                        <span>⏳ ${s.dl}</span>
                        <span>💰 ${DATA.CUR[s.c] || ""}</span>
                    </div>
                </div>\n`;
    });

    if (!cardsHtml) {
        cardsHtml = `                <div class="note" style="text-align:center;padding:24px 16px">No matching scholarships found. Try relaxing your filters or search terms.</div>\n`;
    }

    // 2. Render Origin Country Select Options
    const originOptionsHtml = Object.entries(DATA.C)
        .filter(([k]) => k !== "EU")
        .sort((a, b) => a[1][0].localeCompare(b[1][0]))
        .map(([k, v]) => `                            <option value="${k}"${k === origin ? " selected" : ""}>${v[0]}</option>`)
        .join("\n");

    // 3. Render Filter Chips
    const degreeChipsHtml = [["", "All"], ["B", "Bachelor's"], ["M", "Master's"], ["P", "PhD"]]
        .map(([v, t]) => `<button type="button" class="chip ${v === "" ? "on" : ""}" data-v="${v}">${t}</button>`)
        .join("");

    const fundChipsHtml = [["", "All"], ["F", "Full-funded"], ["P", "Partial"]]
        .map(([v, t]) => `<button type="button" class="chip ${v === "" ? "on" : ""}" data-v="${v}">${t}</button>`)
        .join("");

    const domChipsHtml = [["", "All"], ...Object.entries(DATA.DOM)]
        .map(([v, t]) => `<button type="button" class="chip ${v === "" ? "on" : ""}" data-v="${v}">${t}</button>`)
        .join("");

    const regions = [...new Set(Object.values(DATA.C).map(c => c[3]))].sort();
    const regChipsHtml = [["", "All"], ...regions.map(r => [r, r])]
        .map(([v, t]) => `<button type="button" class="chip ${v === "" ? "on" : ""}" data-v="${v}">${t}</button>`)
        .join("");

    const expChipsHtml = [["", "All"], ["none", "2+ Yrs Needed"], ["req", "Work Exp Required"]]
        .map(([v, t]) => `<button type="button" class="chip ${v === "" ? "on" : ""}" data-v="${v}">${t}</button>`)
        .join("");

    const langChipsHtml = [["", "All"], ["exempt", "Waiver / MOI OK"], ["ielts", "IELTS Specified"]]
        .map(([v, t]) => `<button type="button" class="chip ${v === "" ? "on" : ""}" data-v="${v}">${t}</button>`)
        .join("");

    return {
        count: list.length,
        cardsHtml,
        originOptionsHtml,
        degreeChipsHtml,
        fundChipsHtml,
        domChipsHtml,
        regChipsHtml,
        expChipsHtml,
        langChipsHtml
    };
}

// Function to safely pre-render HTML into index.html using exact tag boundaries
function prerenderIndexHtml() {
    const templatePath = path.join(__dirname, 'index.html');
    let html = fs.readFileSync(templatePath, 'utf8');

    const rendered = renderPageToString({ origin: "BD" });

    // 1. Inject Cards between <div class="cards-list" id="list"> and next </div>
    const listTag = '<div class="cards-list" id="list">';
    const footnoteTag = '<!-- Footnote / Sources -->';
    const listStartIdx = html.indexOf(listTag);
    if (listStartIdx > -1) {
        const footnoteIdx = html.indexOf(footnoteTag, listStartIdx);
        if (footnoteIdx > -1) {
            const listEndIdx = html.lastIndexOf('</div>', footnoteIdx);
            if (listEndIdx > listStartIdx) {
                html = html.substring(0, listStartIdx) +
                    `<div class="cards-list" id="list">\n${rendered.cardsHtml}            </div>` +
                    html.substring(listEndIdx + 6);
            }
        }
    }

    // 2. Inject Origin Options
    const orgTag = '<select id="org" aria-label="Your country of origin">';
    const orgEndTag = '</select>';
    const orgStartIdx = html.indexOf(orgTag);
    if (orgStartIdx > -1) {
        const orgEndIdx = html.indexOf(orgEndTag, orgStartIdx);
        if (orgEndIdx > -1) {
            html = html.substring(0, orgStartIdx) +
                `${orgTag}\n${rendered.originOptionsHtml}\n                    ${orgEndTag}` +
                html.substring(orgEndIdx + orgEndTag.length);
        }
    }

    // 3. Inject Filter Chips
    html = html.replace(/<div class="chips" id="lvl">[\s\S]*?<\/div>/, `<div class="chips" id="lvl">${rendered.degreeChipsHtml}</div>`);
    html = html.replace(/<div class="chips" id="fund">[\s\S]*?<\/div>/, `<div class="chips" id="fund">${rendered.fundChipsHtml}</div>`);
    html = html.replace(/<div class="chips" id="dom">[\s\S]*?<\/div>/, `<div class="chips" id="dom">${rendered.domChipsHtml}</div>`);
    html = html.replace(/<div class="chips" id="reg">[\s\S]*?<\/div>/, `<div class="chips" id="reg">${rendered.regChipsHtml}</div>`);
    html = html.replace(/<div class="chips" id="expFilter">[\s\S]*?<\/div>/, `<div class="chips" id="expFilter">${rendered.expChipsHtml}</div>`);
    html = html.replace(/<div class="chips" id="langFilter">[\s\S]*?<\/div>/, `<div class="chips" id="langFilter">${rendered.langChipsHtml}</div>`);

    // 4. Inject Count Badges
    html = html.replace(/<span class="count-pill" id="cntBadge">.*?<\/span>/, `<span class="count-pill" id="cntBadge">${rendered.count}</span>`);
    html = html.replace(/<span id="mobileCount">.*?<\/span>/, `<span id="mobileCount">${rendered.count}</span>`);

    fs.writeFileSync(templatePath, html, 'utf8');
    console.log(`✅ Pre-rendered ${rendered.count} scholarships into index.html safely!`);
}

// Standard Web Security Headers
const SECURITY_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://countapi.mileshilliard.com; object-src 'none'; base-uri 'self';"
};

// Runtime SSR Server (if run directly: node ssr.js --serve)
function startSsrServer(port = 8080) {
    const webRoot = path.resolve(__dirname);

    const server = http.createServer((req, res) => {
        const parsedUrl = new URL(req.url, `http://localhost:${port}`);
        let pathname = parsedUrl.pathname;
        if (pathname === '/') pathname = '/index.html';

        const ext = path.extname(pathname);
        const mimeTypes = {
            '.html': 'text/html; charset=utf-8',
            '.js': 'text/javascript; charset=utf-8',
            '.css': 'text/css; charset=utf-8',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.ico': 'image/x-icon',
            '.svg': 'image/svg+xml',
            '.xml': 'application/xml; charset=utf-8',
            '.txt': 'text/plain; charset=utf-8'
        };

        if (pathname === '/index.html') {
            const origin = parsedUrl.searchParams.get('org') || 'BD';
            const query = parsedUrl.searchParams.get('search') || parsedUrl.searchParams.get('q') || '';
            const dst = parsedUrl.searchParams.get('dst');
            const sort = parsedUrl.searchParams.get('sort') || 'default';

            const rendered = renderPageToString({ origin, q: query, dst, sort });
            let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

            const listTag = '<div class="cards-list" id="list">';
            const footnoteTag = '<!-- Footnote / Sources -->';
            const listStartIdx = html.indexOf(listTag);
            if (listStartIdx > -1) {
                const footnoteIdx = html.indexOf(footnoteTag, listStartIdx);
                if (footnoteIdx > -1) {
                    const listEndIdx = html.lastIndexOf('</div>', footnoteIdx);
                    if (listEndIdx > listStartIdx) {
                        html = html.substring(0, listStartIdx) +
                            `<div class="cards-list" id="list">\n${rendered.cardsHtml}            </div>` +
                            html.substring(listEndIdx + 6);
                    }
                }
            }

            html = html.replace(/<span class="count-pill" id="cntBadge">.*?<\/span>/, `<span class="count-pill" id="cntBadge">${rendered.count}</span>`);
            html = html.replace(/<span id="mobileCount">.*?<\/span>/, `<span id="mobileCount">${rendered.count}</span>`);

            res.writeHead(200, { ...SECURITY_HEADERS, 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
            return;
        }

        // Static file serving with strict Path Traversal & boundary checking
        const normalizedPath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
        const safeFilePath = path.resolve(webRoot, '.' + normalizedPath);

        if (!safeFilePath.startsWith(webRoot)) {
            res.writeHead(403, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('403 Forbidden: Access outside web root denied');
            return;
        }

        fs.readFile(safeFilePath, (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    const notFoundPath = path.join(webRoot, '404.html');
                    fs.readFile(notFoundPath, (err404, data404) => {
                        res.writeHead(404, { ...SECURITY_HEADERS, 'Content-Type': 'text/html; charset=utf-8' });
                        res.end(err404 ? '404 Page Not Found' : data404);
                    });
                } else {
                    res.writeHead(500, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('Internal Server Error');
                }
            } else {
                res.writeHead(200, { ...SECURITY_HEADERS, 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
                res.end(data);
            }
        });
    });

    server.listen(port, () => {
        console.log(`🚀 Scholaro SSR Server running securely at http://localhost:${port}/`);
    });
}

// If invoked as CLI script
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.includes('--serve') || args.includes('-s')) {
        const portIdx = args.indexOf('--port') > -1 ? args.indexOf('--port') + 1 : -1;
        const port = portIdx > -1 && args[portIdx] ? parseInt(args[portIdx], 10) : 8080;
        startSsrServer(port);
    } else {
        prerenderIndexHtml();
    }
}

module.exports = {
    renderPageToString,
    prerenderIndexHtml,
    startSsrServer
};
