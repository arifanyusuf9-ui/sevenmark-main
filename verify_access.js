import fs from 'fs';

const env = fs.readFileSync('.env', 'utf8')
    .split('\n')
    .reduce((acc, line) => {
        const [key, value] = line.split('=');
        if (key && value) acc[key.trim()] = value.trim().replace(/^"(.*)"$/, '$1');
        return acc;
    }, {});

async function testResend() {
    try {
        const res = await fetch('https://api.resend.com/api-keys', {
            headers: {
                'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                'User-Agent': 'Sevenmark-Verifier/1.0'
            }
        });
        console.log('Resend:', res.status === 200 ? 'OK' : `Failed (${res.status})`);
    } catch (e) {
        console.log('Resend: Error', e.message);
    }
}

await testResend();
