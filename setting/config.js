
const fs = require("fs");
const chalk = require("chalk");
const moment = require('moment-timezone');




global.ownerr = "62****"; //untuk send receipt data
//━━━━━━━━━━━━━━━[ DATA BOT ]━━━━━━━━━━━━━━━━━//
global.owner = ["62****"];             // Isi Jadi Nomer Owner
global.packname = "Digezz";    // Isi Jadi Nama Bot
global.author = "ownOnly";             // Nama Owner atau biarin saja
global.versionscript = "5.4.0"; 
global.session = "session";

//━━━━━━━━━━━━━━━[ DATA DIGIFLAZZ ]━━━━━━━━━━━━━━━━━//
global.userme = "kosong";    // ISI USERNAME DIGI
global.production = "kosong"    // ISI PRODUCTION DIGI; 

//━━━━━━━━━━━━━━━[ DATA TOKOVOUCHER ]━━━━━━━━━━━━━━━━━//
global.membercode = "kosong";    // ISI MEMBER CODE TOKOV
global.signaturetv = "kosong"    // ISI SIGNATURE TOKOV;
global.secrettv = "kosong"   // ISI SECRET KEY TOKOV;    

    
// Payment Deposit
global.tujuan = {
	qris: fs.readFileSync(`./db/qris.jpg`),
    bca: 'kosong',
    gopay: 'kosong',
    dana: 'kosong',
    shopeepay: 'kosong',
 }
 global.atasnama = {
	qris: 'kosong',
    bca: 'kosong',
    gopay: 'kosong',
    dana: 'kosong',
    shopeepay: 'kosong',
 }
global.minimal = {
    qris: 10000,
    bca: 10000,
    gopay: 10000,
    dana: 10000,
    shopeepay: 10000,
}

// Website Api
global.APIs = {
  zenz: "https://api.zahwazein.xyz",
  lol: "https://api.lolhuman.xyz",
};

// Apikey Website Api
global.APIKeys = {
  "https://api.zahwazein.xyz": "zenzkey_6c68a82640", 
  "https://api.lolhuman.xyz": "f0b105c1634b810b34523af0",
};
// Zenzkey & Lolkey
global.zenzkey = "zenzkey_6c68a82640";
global.lolkey = "digezzz";


global.mess = {
  wait: "Loading...",
  owner: "Fitur Khusus Owner Bot",
  waitdata: "Melihat Data Terkini...",
  admin: "Fitur Khusus Admin Group!",
  group: "Fitur Digunakan Hanya Untuk Group!",
  private: 'Fitur Digunakan Hanya Untuk Private Chat!',
  botAdmin: "Bot Harus Menjadi Admin Terlebih Dahulu!",
  kon: `Digiflazz apikey kamu masih kosong nih, Tolong diisi konfigurasi nya dulu yah`
};

global.tanggalserver = `${moment().tz("Asia/Jakarta").format("ll")}`;
global.waktuserver = `${moment.tz('Asia/Jakarta').format('HH:mm:ss')}`; 

let http = require('http')
            http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
            resp.on('data', function(ip) {
                (global.ipserver = ip);
            })
          })

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
