import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const partners = [
    { name: 'HYSACAM', domain: 'hysacam-proprete.com' },
    { name: 'BOCOM', domain: 'bocom.cm' },
    { name: 'FOKOU LOGISTIC', domain: 'fokou.com' },
    { name: 'LES ACIERIES DU CAMEROUN', domain: 'fokou.com' },
    { name: 'SEFAC', domain: 'groupe-sefac.com' },
    { name: 'BATI SERVICES', domain: 'batiservices-cm.com' },
    { name: 'ESER CONTRACTING', domain: 'eser.com' },
    { name: 'NEGRI CAMEROUN', domain: 'groupe-negri.com' },
    { name: 'SMAR', domain: 'smar.com' },
    { name: 'AFRIMAR', domain: 'afrimar.com' }
];

const destDir = path.join(__dirname, 'public', 'partners');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

async function downloadLogo(partner) {
    try {
        const url = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${partner.domain}&size=128`;
        const dest = path.join(destDir, `${partner.name.replace(/\s+/g, '_').toLowerCase()}.png`);

        console.log(`Fetching ${url}...`);
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream'
        });

        response.data.pipe(fs.createWriteStream(dest));

        return new Promise((resolve, reject) => {
            response.data.on('end', () => {
                console.log(`Successfully downloaded logo for ${partner.name}`);
                resolve(true);
            });
            response.data.on('error', (err) => {
                console.error(`Error writing file for ${partner.name}: ${err}`);
                resolve(false);
            });
        });
    } catch (error) {
        console.log(`No logo found for ${partner.name} at ${partner.domain}`);
        return false;
    }
}

async function main() {
    console.log('Starting logo downloads with axios...');
    for (const partner of partners) {
        await downloadLogo(partner);
    }
    console.log('Finished downloading logos.');
}

main();
