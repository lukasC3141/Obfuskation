const express = require('express');
const { exec } = require('child_process');
const app = express();

// SOURCE: Uživatel posílá data přes query parametr v URL (např. ?ping=8.8.8.8)
app.get('/api/ping', (req, res) => {
    const targetIp = req.query.ping;

    // SINK: Neočištěný vstup od uživatele je přímo zřetězen do shell příkazu
    // Útočník může poslat: ?ping=8.8.8.8; cat /etc/passwd
    exec(`ping -c 4 ${targetIp}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send(stderr);
        }
        res.send(stdout);
    });
});

app.listen(3000);
