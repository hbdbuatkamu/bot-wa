
require('./config')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, downloadContentFromMessage, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
// new module
const axios = require('axios');
const os = require('os');
const { exec } = require("child_process");
const speed = require('performance-now');
const { sizeFormatter } = require('human-readable');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const moment = require('moment-timezone');
const crypto = require("crypto");

//code
let signup = JSON.parse(fs.readFileSync('./src/user.json'))
let ban = JSON.parse(fs.readFileSync('./src/banned.json'))
let isBanned = JSON.parse(fs.readFileSync('./src/banned.json'))
let antilink = JSON.parse(fs.readFileSync('./src/antilink.json'));
let balanceDB = JSON.parse(fs.readFileSync('./src/balance.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./src/db_list.json'))
let set_welcome_db = JSON.parse(fs.readFileSync('./src/set_welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./src/set_left.json'));
let _welcome = JSON.parse(fs.readFileSync('./src/welcome.json'));
let _left = JSON.parse(fs.readFileSync('./src/left.json'));
let set_open = JSON.parse(fs.readFileSync('./src/set_open.json'));
let set_close = JSON.parse(fs.readFileSync('./src/set_close.json'));
let antiwame = JSON.parse(fs.readFileSync('./src/antiwame.json'));
let antilink2 = JSON.parse(fs.readFileSync('./src/antilink2.json'));
let antiwame2 = JSON.parse(fs.readFileSync('./src/antiwame2.json'));
let simisimi = JSON.parse(fs.readFileSync('./src/simisimi.json'));
let sewa = JSON.parse(fs.readFileSync('./src/sewa.json'));
let ugold = JSON.parse(fs.readFileSync('./src/gold.json'));
let usilver = JSON.parse(fs.readFileSync('./src/silver.json'));

const { addResponList, 
       delResponList, 
       isAlreadyResponList, 
       isAlreadyResponListGroup, 
       sendResponList, 
       updateResponList, 
       getDataResponList
 } = require('../src/function_list')
 const {
  isSetClose,
  addSetClose,
  removeSetClose,
  changeSetClose,
  getTextSetClose,
  isSetLeft,
  addSetLeft,
  removeSetLeft,
  changeSetLeft,
  getTextSetLeft,
  isSetOpen,
  addSetOpen,
  removeSetOpen,
  changeSetOpen,
  getTextSetOpen,
  isSetWelcome,
  addSetWelcome,
  removeSetWelcome,
  changeSetWelcome,
  getTextSetWelcome
} = require("../lib/store")
const blnc = require("../lib/balance");
const {
  upDeposit,
  cekDeposit,
  letsgo,
  getCateBrand,
  skuCode,
} = require("../lib/dataDigi");
const {
  smsg,
  fetchJson,
  getBuffer,
  getGroupAdmins,
  TelegraPh,
  msToDate,
  isUrl,
  hitungmundur,
  checkBandwidth,
  runtime
} = require('../lib/simple')
const {
  stalkff,
  stalkml,
} = require('../lib/stalker')
const {
  stalk,
  notify,
  receipt,
  receipt2,
} = require('../lib/validasi')
const _gold = require("../lib/gold")
const _silver = require("../lib/silver")
const _sewa = require("../lib/sewa");
const { simpanRiwayatOrder } = require("../lib/riwayat")
require('./menu')
const depositPath = "./db/deposit/";
const topupPath = "./db/topup/";
const riwayatPath = "./db/riwayat/";
// is function
const formatp = sizeFormatter({
  std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})


const jsonformat = (string) => {
  return JSON.stringify(string, null, 2)
}


const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = vler = async (dica, m, chatUpdate, store) => {
  try {
    var body =
    m.mtype === "conversation"
    ? m.message.conversation
    : m.mtype == "imageMessage"
    ? m.message.imageMessage.caption
    : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text
        : "";
  
        var budy = (typeof m.text == 'string' ? m.text : '')
    // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
    var prefix2 = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "";
    const isCmd2 = body.startsWith(prefix);
    const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
    const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await dica.decodeJid(dica.user.id);
    const itsMeDica = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isBanned = ban.includes(m.sender)    
    const itsMe = m.sender == botNumber ? true : false;
    let text = (q = args.join(" "));
    const fatkuns = (m.quoted || m)
    const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ''
    const qmsg = (quoted.msg || quoted)
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);
    const tanggal = moment().tz("Asia/Jakarta").format("ll")
    const tanggal2 = moment().tz("Asia/Jakarta").locale("id").format("ll")
    const wayah = moment.tz('asia/jakarta').format('HH:mm:ss z')
    const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
    const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
	if(time2 < "23:59:00"){
        var ucapanWaktu = 'Selamat Malam'
}
        if(time2 < "19:00:00"){
        var ucapanWaktu = 'Selamat Petang'
}
        if(time2 < "18:00:00"){
        var ucapanWaktu = 'Selamat Sore'
}
        if(time2 < "15:00:00"){
        var ucapanWaktu = 'Selamat Siang️'
}
        if(time2 < "11:00:00"){
        var ucapanWaktu = 'Selamat Pagi'
}
        if(time2 < "05:00:00"){
        var ucapanWaktu = 'Selamat Malam'
}
    var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
	var date = new Date();
	var thisDay = date.getDay(),
    thisDay = myDays[thisDay];  
    
    const from = m.chat;
    const reply = m.reply;
    const sender = m.sender;
    const mek = chatUpdate.messages[0];  
    
	const type = getContentType(m.message)
    const quotedType = getContentType(m.message?.extendedTextMessage?.contextInfo?.quotedMessage) || null
    if (type == 'ephemeralMessage') {
        m.message = m.message.ephemeralMessage.message
        m.message = m.message.ephemeralMessage.message.viewOnceMessage
    }
    if (type == 'viewOnceMessage') {
        m.message = m.message.viewOnceMessage.message
    }

    const mentionByTag = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
    const mentionByReply = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
    const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
    mention != undefined ? mention.push(mentionByReply) : []
    const mentionUser = mention != undefined ? mention.filter(n => n) : []
    let mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || []
      
    const isImage = type == 'imageMessage'
    const isVideo = type == 'videoMessage'
    const isAudio = type == 'audioMessage'
    const isSticker = type == 'stickerMessage'
    const isContact = type == 'contactMessage'
    const isLocation = type == 'locationMessage'

    const isQuoted = type == 'extendedTextMessage'
    const isQuotedImage = isQuoted && quotedType == 'imageMessage'
    const isQuotedVideo = isQuoted && quotedType == 'videoMessage'
    const isQuotedAudio = isQuoted && quotedType == 'audioMessage'
    const isQuotedSticker = isQuoted && quotedType == 'stickerMessage'
    const isQuotedContact = isQuoted && quotedType == 'contactMessage'
    const isQuotedLocation = isQuoted && quotedType == 'locationMessage'
    const isAntiLink = antilink.includes(m.chat) ? true : false
    const isSimi = simisimi.includes(m.chat) ? true : false
    const isAntiWame = antiwame.includes(m.chat) ? true : false
    const isAntiLink2 = antilink2.includes(m.chat) ? true : false
    const isAntiWame2 = antiwame2.includes(m.chat) ? true : false
    const isWelcome = _welcome.includes(m.chat) ? true : false
    const isLeft = _left.includes(m.chat) ? true : false
    const isSewa = _sewa.checkSewaGroup(from, sewa) ? true : false

    if (m.message) {
      dica.readMessages([m.key])
      console.log(chalk.black(chalk.bgWhite('[ CMD ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname), chalk.yellow(sender.split('@')[0]) + '\n' + chalk.blueBright('=> In'), chalk.green(m.isGroup ? 'Groups': 'Chat Pribadi', m.chat.split('@')[0]))
  }


const checksilverUser = (userId, _dir) => {
    let status = false;
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            status = true;
        }
    });
    return status;
};
const checkgoldUser = (userId, _dir) => {
  let status = false;
  Object.keys(_dir).forEach((i) => {
      if (_dir[i].id === userId) {
          status = true;
      }
  });
  return status;
};

const watchGoldFile = () => {
  fs.watchFile('./src/gold.json', (curr, prev) => {
      if (curr.mtime !== prev.mtime) {
          ugold = JSON.parse(fs.readFileSync('./src/gold.json'));
      }
  });
};
const watchSilverFile = () => {
  fs.watchFile('./src/silver.json', (curr, prev) => {
      if (curr.mtime !== prev.mtime) {
          usilver = JSON.parse(fs.readFileSync('./src/silver.json'));
      }
  });
};
watchSilverFile();
watchGoldFile();
const isGOLD = checkgoldUser(sender, ugold) ? true : false
const isPRO = checksilverUser(sender, usilver) ? true : false

  function validasiStalk() {
    try {
        const validasiData = JSON.parse(fs.readFileSync('./src/validasi.json', 'utf-8'));
        return validasiData.stalk;
    } catch (error) {
        console.error('Terjadi kesalahan dalam membaca file validasi:', error.message);
        return false;
    }
}

function validasiReceipt() {
  try {
      const validasiData = JSON.parse(fs.readFileSync('./src/validasi.json', 'utf-8'));
      return validasiData.receipt;
  } catch (error) {
      console.error('Terjadi kesalahan dalam membaca file validasi:', error.message);
      return false;
  }
}

  function toLvl(input) {
  if (typeof input === 'number') {
    return (input / 100) + 1;
  } else if (typeof input === 'string') {
    const inputNumber = parseFloat(input.replace(',', '.'));
    if (!isNaN(inputNumber)) {
      return (inputNumber / 100) + 1;
    }
  }
  return "Masukan tidak valid";
}
    async function downloadAndSaveMediaMessage (type_file, path_file) {
        	if (type_file === 'image') {
                var stream = await downloadContentFromMessage(m.message.imageMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'video') {
                var stream = await downloadContentFromMessage(m.message.videoMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'sticker') {
                var stream = await downloadContentFromMessage(m.message.stickerMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'audio') {
                var stream = await downloadContentFromMessage(m.message.audioMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	}
        }
        function mentions(teks, mems = [], id) {
          if (id == null || id == undefined || id == false) {
          let res = dica.sendMessage(from, { text: teks, mentions: mems })
          return res } else { let res = dica.sendMessage(from, { text: teks, mentions: mems }, { quoted: m })
          return res}}
    

    // Group
    const groupMetadata = m.isGroup ? await dica.groupMetadata(m.chat).catch((e) => {}) : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    const isGroup = m.isGroup
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const isUser = signup.includes(sender)
    
//━━━━━━━━━━━━━━━[ ANTILINK ]━━━━━━━━━━━━━━━━━//
const konf = userme === 'kosong' && production === 'kosong'
        if (isGroup && isAntiLink && !isAdmins && isBotAdmins){
            if (chath.includes(`https://chat.whatsapp.com`)) {
                await dica.sendMessage(from, { delete: m.key })
                reply(`🛡 *GROUP LINK DETECTOR* 🛡\n\nBudayakan baca Deskribsi mas, mari saling menghargai`)
                
                let number = sender
      dica.groupParticipantsUpdate(from, [number], "remove")
            }
        }    
        if (isAntiLink2) {
          if (budy.match(`chat.whatsapp.com`)) {
              if (!isBotAdmins) return //reply(`Upsss... gajadi, bot bukan admin`)
              let gclink = (`https://chat.whatsapp.com/` + await dica.groupInviteCode(m.chat))
              let isLinkThisGc = new RegExp(gclink, 'i')
              let isgclink = isLinkThisGc.test(m.text)
              if (isgclink) return //reply(`Upsss... gak jadi, untung link gc sendiri`)
              if (isAdmins) return //reply(`Upsss... gak jadi, kasian adminnya klo di kick`)
              if (itsMeDica) return //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
              if (m.key.fromMe) return //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
              await dica.sendMessage(m.chat, {
                  delete: {
                      remoteJid: m.chat,

                      fromMe: false,
                      id: m.key.id,
                      participant: m.key.participant
                  }
              })
          }
      }
      if (isAntiWame) { 
          if (budy.match(`wa.me/`)) {
              reply(`*「 ANTI WA ME 」*\n\nWa Me detected, maaf kamu akan di kick !`)
              if (!isBotAdmins) return reply(`Upsss... gajadi, bot bukan admin`)
          
              if (m.key.fromMe) return reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
              await dica.sendMessage(m.chat, {
                  delete: {
                      remoteJid: m.chat,

                      fromMe: false,
                      id: m.key.id,
                      participant: m.key.participant
                  }
              })
                  if (isAdmins) return reply(`admin dongo`)
              if (itsMeDica) return reply(`owner dongo`)
              dica.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
          }
      }
      if (isAntiWame2) {
          if (budy.match(`wa.me/`)) {
              if (!isBotAdmins) return //reply(`Upsss... gajadi, bot bukan admin`)
              if (isAdmins) return //reply(`Upsss... gak jadi, kasian adminnya klo di kick`)
              if (itsMeDica) return //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
              if (m.key.fromMe) return //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
              await dica.sendMessage(m.chat, {
                  delete: {
                      remoteJid: m.chat,

                      fromMe: false,
                      id: m.key.id,
                      participant: m.key.participant
                  }
              })
          }
      }
      
    // Push Message To Console
    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;
    
if (budy.toLowerCase() === 'p') {
if (!isAdmins || !m.quoted || !isGroup) return
  let proses = `O━• Transaksi Pending •━O\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${wayah}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan : ${m.quoted.text}\n\nPesanan @${m.quoted.sender.split("@")[0]} sedang di proses!\n\n━O━O━••••••••••••━O━O━`
  mentions(proses, [m.quoted.sender], true)
} 
if (budy.toLowerCase() === 'd'){
if (!isAdmins || !m.quoted || !isGroup) return
let sukses = `O━• Transaksi Sukses •━O\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${wayah}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih atas orderannya @${m.quoted.sender.split("@")[0]}🙏\n\n━O━O━••••••••••••━O━O━`
mentions(sukses, [m.quoted.sender], true)
}
    // Jika ada user
    if (isCmd2 && !isUser) {
      signup.push(sender)
      fs.writeFileSync('./src/user.json', JSON.stringify(signup, null, 2))
    }
    function removeSpaceFromString(text) {
      return text.replace(/\s+/g, '');
    }
function toRupiah(angka) {
  var angkaStr = angka.toString();
  var angkaTanpaKoma = angkaStr.split('.')[0];
  var angkaRev = angkaTanpaKoma.toString().split('').reverse().join('');
  var rupiah = '';
for (var i = 0; i < angkaRev.length; i++) {
if (i % 3 == 0) rupiah += angkaRev.substr(i, 3) + '.';
}
return '' + rupiah.split('', rupiah.length - 1).reverse().join('');
}

const files = fs.readdirSync(depositPath);
if (files.length > 0) {
  if (budy.toLowerCase() === "yyee") {
    if(!itsMeDica) return;
    let data_deposit = JSON.parse(fs.readFileSync(depositPath + files[0]));
    let depositnya = data_deposit.data.amount_deposit;
    blnc.addBalance(data_deposit.number, depositnya, balanceDB);
    var text_sukses = `*DEPOSIT-SUKSES*
*ID:* ${data_deposit.ID}
*Nomer:* wa.me/${data_deposit.number.split('@')[0]}
*Payment:* ${data_deposit.payment}
*Tanggal:* ${data_deposit.date.split(' ')[0]}
*Jumlah Depo:* Rp ${toRupiah(data_deposit.data.amount_deposit)}`;
    reply(text_sukses);
    dica.sendMessage(
      data_deposit.number,
     {text: `${text_sukses}\n\n_Depositmu telah dikonfirmasi oleh admin, silahkan cek saldo dengan cara *#me*_`}
    );
    fs.unlinkSync(depositPath + files[0]);
  } else if (budy.toLowerCase() === "gee") {
  	if(!itsMeDica) return;
    let data_deposit = JSON.parse(fs.readFileSync(depositPath + files[0]));
    reply(`Sukses Reject Deposit dengan ID : ${data_deposit.ID}`);
    dica.sendMessage(
      data_deposit.number,
      {text: `Maaf Deposit Dengan ID : ${data_deposit.ID} DiReject, Silahkan Hubungin Owner\n\nwa.me/${owner}`}
    );
    fs.unlinkSync(depositPath + files[0]);
  }
}
if (!isCmd2 && m.isGroup && isAlreadyResponList(from, budy.toLowerCase(), db_respon_list)) {
  const budyLower = budy.toLowerCase();

  var get_data_respon = getDataResponList(from, budyLower, db_respon_list);

  if (get_data_respon.isImage === false) {
      dica.sendMessage(from, { text: sendResponList(from, budyLower, db_respon_list) }, {
          quoted: m
      });
  } else {
      dica.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
          quoted: m
      });
  }
}
_sewa.expiredCheck(dica, sewa)    
_gold.goldexpiredCheck(dica, ugold)    
_silver.silverexpiredCheck(dica, usilver)          
  if (fs.existsSync(riwayatPath + m.sender.split("@")[0] + "digi.json")) {
    if (budy.startsWith(prefix2) && !m.key.fromMe) {
      let data_topup = JSON.parse(fs.readFileSync(riwayatPath + m.sender.split("@")[0] + "digi.json"));

      if (data_topup.session === "amount") {
        if (isNaN(budy)) {
          reply("Masukan hanya angka yah");
          return;
        }
        data_topup.jumlah = Number(budy);
        if (data_topup.jumlah < 200000) return reply(`Jumlah Rp${toRupiah(budy)} Gabisa kak\nMinimal Rp200.000`);
        reply("Oke kak\nAtas nama pengirimnya?");
        data_topup.session = "konfirmasi_jumlah";
        fs.writeFileSync(riwayatPath + m.sender.split("@")[0] + "digi.json", JSON.stringify(data_topup, null, 3));
      } else if (data_topup.session === "konfirmasi_jumlah") {
        data_topup.session = "konfirmasi_deposit";
        data_topup.nama = budy.toUpperCase();
        fs.writeFileSync(riwayatPath + m.sender.split("@")[0] + "digi.json", JSON.stringify(data_topup, null, 3));
        var text2 = `📝 *INPUT-DEPOSIT-DIGI* 📝\n\n
*Atas nama pengirim:* ${data_topup.nama} 
*Nominal Transfer:* ${toRupiah(data_topup.jumlah)}

Apakah data tersebut sudah benar?
Ketik salah apabila data tidak benar`;
        var buttonMessage_dep = {
          text: `${text2}\nSelanjutnya pilih salah satu opsi bank tujuan\nBCA, MANDIRI, BRI`,
          headerType: 1
        }
        dica.sendMessage(from, buttonMessage_dep);
      } else if (data_topup.session === "konfirmasi_deposit") {
        if (budy.toLowerCase() === "bri" || budy.toLowerCase() === "bca" || budy.toLowerCase() === "mandiri") {
          data_topup.tujuan = budy.toUpperCase();
          fs.writeFileSync(riwayatPath + m.sender.split("@")[0] + "digi.json", JSON.stringify(data_topup, null, 3));
          upDeposit(data_topup.jumlah, data_topup.tujuan, data_topup.nama)
            .then(response => {
              console.log(response)
              let data_topup = JSON.parse(fs.readFileSync(riwayatPath + m.sender.split("@")[0] + "digi.json"));
              const deposit = response;
              if (data_topup.tujuan === "BCA") {
                reply(`*Tujuan:* ${data_topup.tujuan}\n*Jumlah Transfer:* Rp${toRupiah(deposit.data.amount)}\n*Berita Transfer:* ${deposit.data.notes}\n*Nomor Rekening Transfer:* 6042888890\n*Nama Rekening:* PT DIGIFLAZZ INTERKONEKSI INDONESIA`);
              } else if (data_topup.tujuan === "MANDIRI") {
                reply(`*Tujuan:* ${data_topup.tujuan}\n*Jumlah Transfer:* Rp${toRupiah(deposit.data.amount)}\n*Berita Transfer:* ${deposit.data.notes}\n*Nomor Rekening Transfer:* 1550009910111\n*Nama Rekening:* PT DIGIFLAZZ INTERKONEKSI INDONESIA`);
              } else if (data_topup.tujuan === "BRI") {
                reply(`*Tujuan:* ${data_topup.tujuan}\n*Jumlah Transfer:* Rp${toRupiah(deposit.data.amount)}\n*Berita Transfer:* ${deposit.data.notes}\n*Nomor Rekening Transfer:* 213501000291307\n*Nama Rekening:* PT DIGIFLAZZ INTERKONEKSI`);
              } else {
                reply(`Lu mah gaada tujuan 🗿\n*Jumlah Transfer:* Rp${toRupiah(deposit.data.amount)}\n*Berita Transfer:* ${deposit.data.notes}`);
              }
              fs.unlinkSync(riwayatPath + m.sender.split("@")[0] + "digi.json");
              console.log(response.data);
            })
            .catch(function (error) {
              const message = error.response.data.data.message;
              console.error(error);
              reply(`Gagal\n${message}`);
              fs.unlinkSync(riwayatPath + m.sender.split('@')[0] + 'digi.json');
            });
        } else if (budy.toLowerCase() === "salah" || budy.toLowerCase() === "n" || budy.toLowerCase() === "gajadi" ) {
          reply(`Baik kak, Deposit dibatalkan`);
          fs.unlinkSync(riwayatPath + m.sender.split('@')[0] + 'digi.json');
          return;
        } else {
          reply("Pilihannya Hanya `BRI` `BCA` atau `MANDIRI`.");
        }
      }
    }
  }

 
  if (fs.existsSync(topupPath + m.sender.split('@')[0] + '.json')) {
    if (budy.startsWith(prefix2) && !m.key.fromMe) {
      let data_topup = JSON.parse(fs.readFileSync(topupPath + m.sender.split('@')[0] + '.json'));
      if (data_topup.session === 'konfirmasi_order') {
        if (budy.toLowerCase() === 'benar' || budy.toLowerCase() === 'y') {
          
          const buyerSkuCode = data_topup.ID;
          const customerNo = data_topup.data.nomer;
          const refId = data_topup.ref_id;
          
          reply('*「 TRANSAKSI PENDING 」*\n\n_Mohon Tunggu Pesanan Anda Sedang Diproses_');
          blnc.lessBalance(data_topup.number, Number(data_topup.data.price), balanceDB);
  
          async function checkTransactionStatus() {
            try {
              const ress = await letsgo(buyerSkuCode, customerNo, refId);
              let status = ress.status;
              let sn = ress.sn;
              let Mess = ress.message;
              let jual = data_topup.data.price
              let modal = ress.price
              let saldo = ress.buyer_last_saldo
              console.log('Pending')
              data_topup.session = "finish";
      fs.writeFileSync(topupPath + m.sender.split("@")[0] + ".json", JSON.stringify(data_topup, null, 3));
              if (status === 'Gagal') {
                blnc.addBalance(data_topup.number, parseInt(data_topup.data.price), balanceDB);
                fs.unlinkSync(topupPath + m.sender.split('@')[0] + '.json');
                reply(
`*「 TRANSAKSI GAGAL 」*\n
*ID Order:* ${data_topup.ref_id}
*Tujuan:* ${data_topup.data.nomer}
*Note:* *${Mess}*`
                );
                return simpanRiwayatOrder(data_topup, pushname, status, sn, m.sender.split("@")[0] + ".json");
              } else if (status === 'Sukses') {
                let targ = '';
                let nickname = '';
                let nomer = '';
                if (validasiStalk()) {
                  targ = `${
                    data_topup.data.brand === 'MOBILE LEGENDS'
                      ? `*Nick:* ${data_topup.data.stalk.nickname}\n*›› ID:* ${data_topup.data.stalk.id}(${data_topup.data.stalk.zoneId})`
                      : data_topup.data.brand === 'FREE FIRE'
                      ? `${data_topup.data.stalk.nickname}`
                      : `${data_topup.data.nomer}`
                  }`;
                  nickname = `${
                    data_topup.data.brand === 'MOBILE LEGENDS'
                      ? `${data_topup.data.stalk.nickname}`
                      : data_topup.data.brand === 'FREE FIRE'
                      ? `${data_topup.data.stalk.nickname}`
                      : `${pushname}`
                  }`;
                  nomer = `${
                    data_topup.data.brand === 'MOBILE LEGENDS'
                      ? `${data_topup.data.stalk.id}(${data_topup.data.stalk.zoneId})`
                      : data_topup.data.brand === 'FREE FIRE'
                      ? `${data_topup.data.stalk.id}`
                      : `${data_topup.data.nomer}`
                  }`;
                } else {
                  targ = `${data_topup.data.nomer}`;
                  nomer = `${data_topup.data.nomer}`
                  nickname = `${pushname}`
                }

                notify(dica, m, status, data_topup.data.product_name, pushname, targ, refId, sn, jual, modal, saldo, jam, tanggal )
const capt = `*「 SUCCESS. BOSSKU 」*
*›› Ref ID :* ${refId}
*›› Status :* ${status}
*›› Item :* ${data_topup.data.product_name}
*›› Target:* ${targ}
*›› Pesan :* ${Mess} 
*›› Harga :* Rp ${toRupiah(data_topup.data.price)}
*›› Tanggal :* ${new Date().toLocaleDateString('ID', { timeZone: 'Asia/Jakarta' })}
*›› Jam :* ${new Date().toLocaleTimeString('ID', { timeZone: 'Asia/Jakarta' })}
══════✪〘 *SN* 〙✪══════
${sn.split('/').join('\n')}
✪═════════════════✪`
console.log(capt)
                if (validasiReceipt()) {
                (async () => {
                  const logo = 'https://i.postimg.cc/CM34YRFb/photo-2021-02-05-10-13-39.jpg';
                  const background = 'https://i.postimg.cc/CM34YRFb/photo-2021-02-05-10-13-39.jpg';
                  const product = data_topup.data.product_name;
                  const time = `${new Date().toLocaleDateString('ID', { timeZone: 'Asia/Jakarta' })}\n${new Date().toLocaleTimeString('ID', { timeZone: 'Asia/Jakarta' })}`;
                  const status_color = 'green';
                  const imagePath = await receipt2(dica, m, from, capt, logo, encodeURIComponent(nickname), background, encodeURIComponent(product), refId, encodeURIComponent(sn), encodeURIComponent(nomer), status, encodeURIComponent(time), status_color);
                  fs.unlinkSync(imagePath);
              })();
            } else {

                reply(capt);
            }
                fs.unlinkSync(topupPath + m.sender.split('@')[0] + '.json');
                return simpanRiwayatOrder(data_topup, pushname, status, sn, m.sender.split("@")[0] + ".json");
              }
              await sleep(7000);
              await checkTransactionStatus();
            } catch (error) {
              console.error(error, '\n');
              reply('Terjadi kesalahan saat memeriksa status transaksi.');
            }
          }
          checkTransactionStatus();
        } else if (budy.toLowerCase() === 'salah' || budy.toLowerCase() === 'n') {
          reply('Orderan Dibatalkan');
          if (fs.existsSync(topupPath + m.sender.split('@')[0] + '.json')) {
            fs.unlinkSync(topupPath + m.sender.split('@')[0] + '.json');
          }
          return;
        } else {
          reply('Mohon masukan `Benar` atau `Salah`.');
        }
      }
    }
  }
  

if (fs.existsSync(depositPath + m.sender. split("@")[0] + ".json")) {
  if (!budy.startsWith(isCmd2) && !m.key.fromMe) {
    let data_deposit = JSON.parse(fs.readFileSync(depositPath + m.sender.split("@")[0] + ".json"))
    if (data_deposit.session === "payment") {
      if (!["gopay", "dana", "bca", "qris"].includes(budy.toLowerCase())) {
        return reply("Pilihannya Hanya `GOPAY` `DANA` `BCA` atau `QRIS`.");
      }

      if(budy.toLowerCase() === 'bca'){
        minim = global.minimal.bca;
      } else if (budy.toLowerCase() === 'gopay'){
        minim = minimal.gopay;
      } else if (budy.toLowerCase() === 'dana'){
        minim = minimal.dana;
      } else if (budy.toLowerCase() === 'qris'){
        minim = minimal.qris;
      }
      data_deposit.minimal = minim;
      data_deposit.payment = budy.toUpperCase();
      data_deposit.session = "amount";
      fs.writeFileSync(depositPath + m.sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
      reply(`Oke kak, mau deposit berapa?\n\nMinimal: ${toRupiah(data_deposit.minimal)}.`)
    } else if (data_deposit.session === "amount") {
      if (isNaN(budy)) return reply("Masukan hanya angka ya")
      data_deposit.data.amount_deposit = Number(budy);
      if (data_deposit.data.amount_deposit < data_deposit.minimal) return reply(`Minimal Rp ${toRupiah(data_deposit.minimal)}`)
      data_deposit.session = "konfirmasi_deposit";
      fs.writeFileSync(depositPath + m.sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
      reply(`*DEPOSIT USER - ${pushname}*    

*ID:* ${data_deposit.ID}
*Payment:* ${data_deposit.payment}
*Jumlah Deposit:* Rp ${toRupiah(data_deposit.data.amount_deposit)}
${data_deposit.payment === 'QRIS' ? `*Qris Admin:* Rp 100\n*Total Pembayaran:* Rp ${toRupiah(data_deposit.data.amount_deposit+100)}` : `*Total Pembayaran:* Rp ${toRupiah(data_deposit.data.amount_deposit)}`}

Apakah data tersebut sudah benar? akan gagal apabila terdapat kesalahan input.

_Ketik Y untuk melanjutkan, N untuk membatalkan_`)
    } else if (data_deposit.session === "konfirmasi_deposit") {
      if (budy.toLowerCase() === "y") {
        data_deposit.session = "konfirmasi";
        fs.writeFileSync(depositPath + m.sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
        if (data_deposit.payment === "GOPAY") {
          reply(`*PAYMENT-GOPAY*

*Nomer:* ${tujuan.gopay}
*AN:* ${atasnama.gopay}

_Silahkan transfer dengan no yang sudah tertera, Jika sudah harap kirim bukti poto dengan caption *#bukti* untuk di acc oleh admin_`)
        } else if (data_deposit.payment === "BCA") {
          reply(`*PAYMENT-BCA*

*Nomer:* ${tujuan.bca}
*AN:* ${atasnama.bca}

_Silahkan transfer dengan no yang sudah tertera, Jika sudah harap kirim bukti poto dengan caption *#bukti* untuk di acc oleh admin_`)
        } else if (data_deposit.payment === "SHOPEPAY") {
          reply(`*PAYMENT-Shopee Pay*

*Nomer:* ${tujuan.shopeepay}
*AN:* ${atasnama.shopeepay}

_Silahkan transfer dengan no yang sudah tertera, Jika sudah harap kirim bukti poto dengan caption *#bukti* untuk di acc oleh admin_`)
        } else if (data_deposit.payment === "QRIS") {
          let capt = `_Silakan lakukan scan QRIS ini untuk melakukan pembayaran., Jika sudah harap kirim bukti poto trasnfer dengan caption *#bukti* untuk di acc oleh admin_`
          let bukti_bayar = {
            image: fs.readFileSync(`./db/qris.jpg`),
            caption: capt,
            headerType: 5 
            }
            dica.sendMessage(from, bukti_bayar, { quoted: m })
          
        } else if (data_deposit.payment === "DANA") {
          reply(`*PAYMENT-DANA*

*Nomer:* ${tujuan.dana}
*AN:* ${atasnama.dana}

_Silahkan transfer dengan no yang sudah tertera, Jika sudah harap kirim bukti poto dengan caption *#bukti* untuk di acc oleh admin_`)
        }
      } else if (budy.toLowerCase() === "n") {
        reply(`Baik kak, Deposit Dengan ID : ${data_deposit.ID} dibatalkan 💩`)
        fs.unlinkSync(depositPath + m.sender.split('@')[0] + '.json')
      }
    }
  }
}

     function getList(kategori, brand, type) {
  const filters = [];
  if (kategori) {
    filters.push({ category: kategori });
  }
  if (brand) {
    filters.push({ brand: brand });
  }
  if (type) {
    filters.push({ type: type });
  }

  getCateBrand(kategori, brand, type)
    .then((pretp) => {
      const profitt = JSON.parse(fs.readFileSync("./src/profit.json"));
      const profit = profitt.profit;

      pretp.sort((a, b) => a.price - b.price);

      let txt = `*•======[${brand.toUpperCase()}]======•*\nSILAHKAN PILIH SERVICE YANG TERSEDIA DIBAWAH INI\n\n`;

      pretp.forEach((item) => {
        const price = itsMeDica ? item.price * profit.dev : item.price * profit.user;
        const status = item.seller_product_status;
        const seller = status ? '✅ Tersedia' : '⛔ Tidak Tersedia';
        txt += `${item.product_name}
code: ${item.buyer_sku_code}
Status: ${seller}
Harga: Rp${toRupiah(price)})\n\n`;
      });

      const randomIndex = Math.floor(Math.random() * pretp.length);
      const randomItem = pretp[randomIndex];

      txt += `\n\nJika ingin melihat info layanan lebih lengkap, gunakan .detail + code\n\nContoh:\n.detail ${randomItem.buyer_sku_code}`;
      reply(txt);
    })
    .catch((error) => {
      const errorMessage = 'Mohon maaf ada gangguan, silakan mencoba kembali.';
      reply(errorMessage);
    });
}
 
  
  function diDetail(eaea){
    skuCode(eaea)
    .then(ktek => {
      if (ktek) {
        const profitt = JSON.parse(fs.readFileSync("./src/profit.json"));
        const profit = profitt.profit
        const price = ktek.price;
        const priceUser = price * profit.user;
console.log(ktek)
        const replyMessage = `*Hae ${itsMeDica ? 'Owner ku': pushname}*
*ID Layanan:* _${ktek.buyer_sku_code}_
*Layanan:* _${ktek.product_name}_
*Harga:* _Rp ${toRupiah(itsMeDica ? price * profit.dev : priceUser)}_
*Status Layanan:* _${ktek.seller_product_status ? 'Tersedia' : '🚫Tidak Tersedia'}_
*Jam Buka Mulai:* _${ktek.start_cut_off}_ \- _${ktek.end_cut_off}_
*Deskripsi Layanan:*
_${ktek.desc}_`;
        return reply(`${replyMessage}\nIngin melanjutkan Order?\nSilahkan ketik => .order ${eaea}`);
      } else {
        return reply("Produk tidak ditemukan.");
      }
    })
    .catch(error => {
      console.error(error.message);
    });
  }
  function saldoDigi(){
    cekDeposit()
    .then((deposit) => {
      if (deposit !== null) {
        reply(`Saldo Digiflazz: Rp${toRupiah(deposit)}`);
      }
    })
    .catch((error) => {
        reply(`Error: ${error.message}`);
        console.error(`Error: ${error.message}`);
      });
    }

 async function processTopupRequest(ttks, nom, zon) {
  const target = zon ? nom + zon : nom;
  const randomRef = crypto.randomBytes(6).toString('hex').toUpperCase();
  
  try {
    const service = await skuCode(ttks);

    if (service) {
      if (service.seller_product_status === false) return reply('Maaf, produk ini sedang mengalami gangguan atau tidak tersedia saat ini.');

      if (m.text.includes(service.buyer_sku_code)) {
        const profitt = JSON.parse(fs.readFileSync("./src/profit.json"));
        const profit = profitt.profit;
        let price = parseFloat(service.price);
        let stalk = null;

        if (validasiStalk()) {
          if (service.brand === "MOBILE LEGENDS") {
            const mlResult = await stalkml(nom, zon);
            console.log('Mobile Legend Result:', mlResult);
            if (mlResult === 'Gagal') return reply('Terjadi Kesalahan!!\nid tidak ditemukan')
            stalk = {
              nickname: mlResult,
              id: nom,
              zoneId: zon
            };
          } else if (service.brand === "FREE FIRE") {
            const userId = target; 
            const ffResult = await stalkff(userId);
            console.log('Free Fire Result:', ffResult);
            if (ffResult === 'Gagal') return reply('Terjadi Kesalahan!!\nid tidak ditemukan')
            stalk = {
              nickname: ffResult,
              id: userId
            };
          } else {
            stalk = "";
          }
        } else {
          stalk = "";
        }

        if (!fs.existsSync(topupPath + m.sender.split("@")[0] + ".json")) {
          const objek_gesek = {
            ref_id: randomRef,
            ID: ttks,
            session: "konfirmasi_order",
            date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta" }),
            number: m.sender,
            buyer: pushname,
            data: {
              modal: price,
              nomer: removeSpaceFromString(target),
              product_name: service.product_name,
              category: service.category,
              brand: service.brand,
              price: itsMeDica ? price * profit.dev : price * profit.user,
              sku_code: service.buyer_sku_code,
              description: service.desc,
              stalk: stalk,
            },
          };

          fs.writeFileSync(topupPath + m.sender.split("@")[0] + ".json", JSON.stringify(objek_gesek, null, 2));
        }

        let data_topup = JSON.parse(fs.readFileSync(topupPath + m.sender.split("@")[0] + ".json"));
        let tartag = "";

        if (validasiStalk()) {
          tartag = `${data_topup.data.brand === "MOBILE LEGENDS" ? `*Nick:* ${data_topup.data.stalk.nickname}\n*ID:* ${data_topup.data.stalk.id}(${data_topup.data.stalk.zoneId})` : (data_topup.data.brand === "FREE FIRE" ? `*Nick:* ${data_topup.data.stalk.nickname}` : `*Nomer:* ${data_topup.data.nomer}`)}`;
        } else {
          tartag = `*Nomer:* ${data_topup.data.nomer}`;
        }

        var text2 = `📝 *FORM TOP UP* 📝\n\n*Produk ID:* ${data_topup.ID}
${tartag}

*Kategory:* ${data_topup.data.category}
*Brand:* ${data_topup.data.brand}
*Produk:* ${data_topup.data.product_name}
*Harga:* Rp${toRupiah(data_topup.data.price)}
\nApakah data tersebut sudah benar? 
Akan gagal apabila terdapat kesalahan input.`;

        var buttonMessage_dep = {
          text: `${text2}\nSilahkan Ketik 'y' jika benar 'n' jika salah`,
          headerType: 1,
        };

        dica.sendMessage(from, buttonMessage_dep);
      } else {
        return reply("Produk tidak ditemukan.");
      }
    }
  } catch (error) {
    console.error(error.message);
  }
}

    switch (command) {
      //━━━━━━━━━━━━━━━[ CASE NYA ]━━━━━━━━━━━━━━━━━//      
        case "ownermenu" :
        if (!itsMeDica) throw mess.owner
        srh = `${global.mowner}`
        dica.sendText(m.chat, srh, m)   
        break;
        case 'owner':
          case 'creator': {
              dica.sendContact(m.chat, global.owner, m)
          }
          break


//━━━━━━━━━━━━━━━[ FITUR DIGIFLAZZ ]━━━━━━━━━━━━━━━━━//                      
case 'listml': {
  if (konf) return reply(mess.kon)
  const kategori = 'Games'
  const brand = 'MOBILE LEGENDS'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break
case 'listwdp': {
  if (konf) return reply(mess.kon)
  const kategori = 'Games'
  const brand = 'MOBILE LEGENDS'
  const type = 'Membership'
getList(kategori, brand, type, )
}
break
case 'listff': {
  if (konf) return reply(mess.kon)
  const kategori = 'Games'
  const brand = 'FREE FIRE'
  const type = ''
getList(kategori, brand, type, )
}
break
case 'listlol': {
  if (konf) return reply(mess.kon)
  const kategori = 'Games'
  const brand = 'League of Legends Wild Rift'
  const type = ''
getList(kategori, brand, type, )
}
break
case 'listundawn': {
  if (konf) return reply(mess.kon)
  const kategori = 'Games'
  const brand = 'Undawn'
  const type = ''
getList(kategori, brand, type, )
}
break
case 'listpubg': {
  if (konf) return reply(mess.kon)
  const kategori = 'Games'
  const brand = 'PUBG MOBILE'
  const type = ''
getList(kategori, brand, type, )
}
break
case 'listgensin': {
  if (konf) return reply(mess.kon)
  const kategori = 'Games'
  const brand = 'Genshin Impact'
  const type = ''
getList(kategori, brand, type, )
}
break

case 'detail':{
  if (konf) return reply(mess.kon)
  if (!text) {
    return reply('CODE ID nya mana?');
  }

  diDetail(text)
}            
break;
case 'depodigi': {
	if (!itsMeDica) return reply(mess.owner);
	if (global.userme === 'kosong' || global.production === 'kosong') {
    return reply(`Digiflazz apikey kamu masih kosong nih, Tolong diisi konfigurasi nya dulu yah`);
  }
      if (!fs.existsSync(riwayatPath + m.sender.split("@")[0] + "digi.json")) {
        var objek_gesek = {
          session: "amount",
          jumlah: "",
          nama: "",
          tujuan: ""
        }
        fs.writeFileSync(riwayatPath + m.sender.split("@")[0] + "digi.json", JSON.stringify(objek_gesek, null, 2));
      } 
      reply('Okey kak, langsung masukan jumlahnya mao berapa?')
}
break;
        case "ceksaldo": {
          if (!itsMeDica) return reply(mess.owner)
         saldoDigi()
        }
        break;

case 'order':{
  if (!itsMeDica) return reply(mess.owner)
  if (konf) return reply(mess.kon)
  const y = text.split(' ');
  if (y.length < 2) return reply('Format yang benar adalah: order layanan target\n\ncontoh\norder ml5 123456 4545');
  const layanan = y[0];
  processTopupRequest(layanan, y[1], y[2] )
      }
      break
//━━━━━━━━━━━━━━━[ FITUR TAMBAHAN ]━━━━━━━━━━━━━━━━━//              
      case 'restart': {
      if (!itsMeDica) return m.reply(mess.owner)
      await m.reply(`_Restarting ${packname}_`)
      try{
        await dica.sendMessage(from, {text: "*_Succes_*"})
        await sleep(3000)
        exec(`npm start`)
      } catch (err) {
        exec(`node index.js`)
        await sleep(4000)
        m.reply('*_Sukses_*')
      }
    }
      break;
      
      case 'listonline': case 'liston': {
        let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
        let online = [...Object.keys(store.presences[id]), botNumber]
        dica.sendText(m.chat, 'List Online:\n\n' + online.map(v => '⭔ @' + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
 }
      break;
      case 'tourl': {
        if (isBanned) return m.reply(`*You Have Been Banned*`)
        m.reply(mess.wait)
        let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./uploader')
        let media = await dica.downloadAndSaveMediaMessage(qmsg)
        if (/image/.test(mime)) {
            let anu = await TelegraPh(media)
            m.reply(util.format(anu))
        } else if (!/image/.test(mime)) {
            let anu = await UploadFileUgu(media)
            m.reply(util.format(anu))
        }
        await fs.
        unlinkSync(media)
    }
    break;
    case 'toaudio': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!text) throw `Example : ${prefix + command} Hallo semua`
      m.reply(mess.wait)
        dica.sendMessage(m.chat, {audio: { url: `https://api.lolhuman.xyz/api/gtts/id?apikey=${lolkey}&text=${text}` }, mimetype: 'audio/mpeg'}, { quoted : m })

    }

    break;
    
    case 'join': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!itsMeDica) throw mess.owner
      if (!text) throw 'Masukkan Link Group!'
      if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
      m.reply(mess.wait)
      let result = args[0].split('https://chat.whatsapp.com/')[1]
      await dica.groupAcceptInvite(result).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
  }
  break;
  case 'block': {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (!itsMeDica) throw mess.owner
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
    await dica.updateBlockStatus(users, 'block').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
  break;
  case 'unblock': {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
		if (!itsMeDica) throw mess.owner
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await dica.updateBlockStatus(users, 'unblock').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	}
    break;
	case "listuser" :
  if (!itsMeDica) throw mess.owner
  teks = '*_List User :)_*\n\n'
  for (let pengguna of signup) {
    teks += `- ${pengguna.split('@')[0]}\n`
  }
  teks += `\n*_Total User : ${signup.length}_*`
  dica.sendMessage(m.chat, { text: teks.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": signup } })
break;              
    case 'tagall': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!m.isGroup) throw mess.group
      if (!isBotAdmins) throw mess.botAdmin
      if (!isAdmins) throw mess.admin
let teks = `══✪〘 *👥 Tag All* 〙✪══

➲ *Pesan : ${q ? q : 'kosong'}*\n\n`
      for (let mem of participants) {
      teks += `⭔ @${mem.id.split('@')[0]}\n`
      }
      dica.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
      }
      break;
      break
      
      case 'list':
        if (!m.isGroup) return reply('Menu list kusus grup tertentu kak')
        if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
        if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini\n\n*Untuk Melihat Fitur Bot Ketik* /help`)
      
        var arr_rows = [];
        for (let x of db_respon_list) {
          if (x.id === from) {
            arr_rows.push({
              title: x.key,
              rowId: x.key
            })
          }
        }
      
        if (arr_rows.length === 0) return reply(`Belum ada list message yang terdaftar di group ini\n\n*Untuk Melihat Fitur Bot Ketik* /help`)
      
        var infoMsg = `*Alternatif jika tombol .list tidak muncul*\n(langsung ketik aja)\n\n╭✄┈⟬ *${groupName}* ⟭\n`;
        for (let row of arr_rows) {
          infoMsg += `┆• ${row.title.toUpperCase()}\n`;
        }
        infoMsg += `╰──────────◇\nJam: ${time2}\nTanggal: ${tanggal}`;
      
        dica.sendMessage(from, {text: infoMsg})
        break;
        case 'additem': case 'addlist':
          if (!m.isGroup) return reply(mess.group)
          if (!isAdmins && !itsMeDica) return reply(mess.admin)
          var args1 = text.split("@")[0]
          var args2 = text.split("@")[1]
          if (!text.includes("@")) return dica.sendMessage(from, {text: `Gunakan dengan cara ${prefix+command} *key@response*\n\n_Contoh_\n\n${prefix+command} tes@apa`}, {quoted: m})
          if (isAlreadyResponList(from, args1.toLowerCase(), db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
          if (isImage || isQuotedImage) {
          let media = await dica.downloadAndSaveMediaMessage(quoted, `./image/${m.sender}`)
          let kilaa = await TelegraPh(media)
          addResponList(from, args1.toLowerCase(), args2, true, kilaa, db_respon_list)
          reply(`Berhasil menambah List menu *${args1}*`)
          if (fs.existsSync(media)) fs.unlinkSync(media)
          } else {
          addResponList(from, args1.toLowerCase(), args2, false, '-', db_respon_list)
          reply(`Berhasil menambah List menu : *${args1}*`)
          }
          break
          case 'delitem': case 'dellist':
          if (!m.isGroup) return reply(mess.group)
          if (!isAdmins && !itsMeDica) return reply(mess.admin)
          if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
          if (!text) return reply(`Gunakan dengan cara ${prefix+command} *key*\n\n_Contoh_\n\n${prefix+command} hello`)
          if (!isAlreadyResponList(from, text.toLowerCase(), db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
          delResponList(from, text.toLowerCase(), db_respon_list)
          reply(`Sukses delete list message dengan key *${text}*`)
          break
          case 'update': case 'updatelist': 
          if (!m.isGroup) return reply(mess.group)
          if (!isAdmins && !itsMeDica) return reply(mess.admin)
          var args1 = text.split("@")[0]
          var args2 = text.split("@")[1]
          if (!text.includes("@")) return reply(`Gunakan dengan cara #${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`)
          if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
          if (isImage || isQuotedImage) {
          let media = await dica.downloadAndSaveMediaMessage(quoted, `./image/${m.sender}`)
          let kila = await TelegraPh(media)
          updateResponList(from, args1.toLowerCase(), args2, true, kila, db_respon_list)
          reply(`Berhasil Update List menu *${args1}*`)
          if (fs.existsSync(media)) fs.unlinkSync(media)
          } else { updateResponList(from, args1.toLowerCase(), args2, false, '-', db_respon_list)
          reply(`Berhasil update List menu : *${args1}*`)
          }
          break
            case 'jodohku': {
            if (isBanned) return m.reply(`*You Have Been Banned*`)
            if (!m.isGroup) throw mess.group
            let member = participants.map(u => u.id)
            let me = m.sender
            let jodoh = member[Math.floor(Math.random() * member.length)]
            let jawab = `👫Jodoh mu adalah

@${me.split('@')[0]} ❤️ @${jodoh.split('@')[0]}`
            let ments = [me, jodoh]
            let buttons = [
                        { buttonId: `${prefix}jodohku`, buttonText: { displayText: 'Jodohku' }, type: 1 }
                    ]
                    await dica.sendButtonText(m.chat, buttons, jawab, dica.user.name, m, {mentions: ments})
            }
      break;
        case 'sticker': case 's': case 'stickergif': 
        if (isBanned) return m.reply(`*You Have Been Banned*`)
        {
          if (/image/.test(mime)) {
          m.reply(mess.wait)
               let media = await dica.downloadMediaMessage(qmsg)
               let encmedia = await dica.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
               await fs.unlinkSync(encmedia)
           } else if (/video/.test(mime)) {
           m.reply(mess.wait)
               if (qmsg.seconds > 11) return m.reply('Maksimal 10 detik!')
               let media = await dica.downloadMediaMessage(qmsg)
               let encmedia = await dica.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
               await fs.unlinkSync(encmedia)
           } else {
               m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Video/Gif 1-9 Detik`)
               }
           }
           break;
           case 'getip': {
            if (!itsMeDica) throw mess.owner
                m.reply("My public IP address is: " + ipserver);
              }
          break;
          case 'ping': case 'botstatus': case 'statusbot': {
            if (!itsMeDica) throw mess.owner
            const used = process.memoryUsage()
            const cpus = os.cpus().map(cpu => {
                cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
          return cpu
            })
            const cpu = cpus.reduce((last, cpu, _, { length }) => {
                last.total += cpu.total
                last.speed += cpu.speed / length
                last.times.user += cpu.times.user
                last.times.nice += cpu.times.nice
                last.times.sys += cpu.times.sys
                last.times.idle += cpu.times.idle
                last.times.irq += cpu.times.irq
                return last
            }, {
                speed: 0,
                total: 0,
                times: {
              user: 0,
              nice: 0,
              sys: 0,
              idle: 0,
              irq: 0
            }
            })
            let timestamp = speed()
            let latensi = speed() - timestamp
            neww = performance.now()
            oldd = performance.now()
            respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}
💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}
${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
            `.trim()
            m.reply(respon)
        }
        break;
        
          case 'ban':
        if (!text) throw `Example : ${prefix + command} 62xxxxxxxxxxx`
		    if (!itsMeDica) throw mess.owner
		    bnnd = `${args[0].replace('@', '')}@s.whatsapp.net`
        ban.push(bnnd)
		    fs.writeFileSync('./src/banned.json', JSON.stringify(ban))
		    m.reply(`${bnnd}`)
        break;
        case 'unban':
        if (!text) throw `Example : ${prefix + command} 62xxxxxxxxxxx`
		    if (!itsMeDica) throw mess.owner
		    bnnd = `${args[0].replace('@', '')}@s.whatsapp.net`
        unp = ban.indexOf(bnnd)
        ban.splice(unp, 1)
		    fs.writeFileSync('./src/banned.json', JSON.stringify(ban))
		    m.reply(`${bnnd}`)
        break;
        case 'listban': case 'lisbanned':
          if (!itsMeDica) throw mess.owner
          teks = '*List Banned*\n\n'
          for (let medog of ban) {
            teks += `- ${medog}\n`
          }
          teks += `\n*Total Banned : ${ban.length}*`
          dica.sendMessage(m.chat, { text: teks.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": ban } })
        break;
              
case 'kick':
		if (!m.isGroup) throw mess.group
    	if (!isBotAdmins) throw mess.botAdmin
    	if (!isAdmins) throw mess.admin
      
            var number;
			if (mentionUser.length !== 0) {
                number = mentionUser[0]
                dica.groupParticipantsUpdate(from, [number], "remove")
                reply('Succes')
              } else if (m.isQuotedMsg) {
                number = m.quotedMsg.sender
                dica.groupParticipantsUpdate(from, [number], "remove")
                reply('Succes')
            } else {
                m.reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
            }              
    break;
case 'add': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!m.isGroup) throw mess.group
      if (!isBotAdmins) throw mess.botAdmin
      if (!isAdmins) throw mess.admin
      let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']
      await dica.groupParticipantsUpdate(m.chat, users, 'add').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
    break;
              
case 'grup' : {
if (!itsMeDica) return m.reply(mess.owner)
if (!m.isGroup) return m.reply(mess.group)
if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!isAdmins) return m.reply(mess.admin)
	if (text === 'close') {
		await dica.groupSettingUpdate(m.chat, 'announcement').then ((res) => m.reply('_Successful Closing The Group_')).catch ((err) => m.reply(jsonformat(err)))
    } else if (text === 'open') {
		await dica.groupSettingUpdate(m.chat, 'not_announcement').then ((res) => m.reply('_Successful Opening The Group_')).catch ((err) => m.reply(jsonformat(err)))
        } else {
let buttons = [
{ buttonId: prefix + 'grup open', buttonText: { displayText: 'Open' }, type: 1 },
{ buttonId: prefix + 'grup close', buttonText: { displayText: 'Close' }, type: 1 },
]
await dica.sendButtonText(m.chat, buttons, 'Grup Mode', packname, m)
}
}
break; 
case 'welcome': {
  if (!m.isGroup) return reply('Fitur Khusus Group!')
  if (!isAdmins) return reply('Fitur Khusus admin!')
  let _welcome = JSON.parse(fs.readFileSync('./src/welcome.json'));
  if (args[0] === "on") {
      if (isWelcome) return reply(`Udah on`)
      _welcome.push(m.chat)
      fs.writeFileSync('./src/welcome.json', JSON.stringify(_welcome, null, 2))
      reply('Sukses mengaktifkan welcome di grup ini')
  }
  else if (args[0] === "off") {
      if (!isWelcome) return reply(`Udah off`)
      let anu = _welcome.indexOf(m.chat)
      _welcome.splice(anu, 1)
      fs.writeFileSync('./src/welcome.json', JSON.stringify(_welcome, null, 2))
      reply('Sukses menonaktifkan welcome di grup ini')
  }
  else {
      reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
  }
}
break
case 'left':
case 'goodbye': {
  if (!m.isGroup) return reply('Fitur Khusus Group!')
  if (!isAdmins) return reply('Fitur Khusus admin!')
  let _left = JSON.parse(fs.readFileSync('./src/left.json'));
  if (args[0] === "on") {
      if (isLeft) return reply(`Udah on`)
      _left.push(m.chat)
      fs.writeFileSync('./src/left.json', JSON.stringify(_left, null, 2))
      reply('Sukses mengaktifkan goodbye di grup ini')
  }
  else if (args[0] === "off") {
      if (!isLeft) return reply(`Udah off`)
      let anu = _left.indexOf(m.chat)
      _left.splice(anu, 1)
      fs.writeFileSync('./src/welcome.json', JSON.stringify(_left, null, 2))
      reply('Sukses menonaktifkan goodbye di grup ini')
  }
  else {
      reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
  }
}
break
case 'antilink': {
  if (!m.isGroup) return reply('Fitur Khusus Group!')
  if (!isAdmins) return reply('Fitur Khusus admin!')
  if (!isBotAdmins) return reply("Bot harus menjadi admin")
  let antilink = JSON.parse(fs.readFileSync('./src/antilink.json'));
  if (args[0] === "on") {
      if (isAntiLink) return reply(`Udah aktif`)
      antilink.push(m.chat)
      fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink, null, 2))
      reply('Successfully Activate Antilink In This Group')
  }
  else if (args[0] === "off") {
      if (!isAntiLink) return reply(`Udah nonaktif`)
      let anu = antilink.indexOf(m.chat)
      antilink.splice(anu, 1)
      fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink, null, 2))
      reply('Successfully Disabling Antilink In This Group')
  }
  else {
      reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
  }

}
break
case 'setwelcome': {
  if (!m.isGroup) return reply('Fitur Khusus Group!')
  if (!isAdmins) return reply('Fitur Khusus owner!')
  if (!text) return reply(`Kirim perintah: ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
  if (isSetWelcome(m.chat, set_welcome_db)) return reply(`Set welcome already active`)
  addSetWelcome(text, m.chat, set_welcome_db)
  reply(`Successfully set welcome!`)
}
break
case 'changewelcome': {
  if (!m.isGroup) return reply('Fitur Khusus Group!')
  if (!isAdmins) return reply('Fitur Khusus owner!')
  if (!text) return reply(`Kirim perintah: ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
  if (isSetWelcome(m.chat, set_welcome_db)) {
      changeSetWelcome(q, m.chat, set_welcome_db)
      reply(`Sukses change set welcome teks!`)
  }
  else {
      addSetWelcome(q, m.chat, set_welcome_db)
      reply(`Sukses change set welcome teks!`)
  }
}
break
case 'delsetwelcome': {
  if (!m.isGroup) return reply('Fitur Khusus Group!')
  if (!isAdmins) return reply('Fitur Khusus owner!')
  if (!isSetWelcome(m.chat, set_welcome_db)) return reply(`Belum ada set welcome di sini..`)
  removeSetWelcome(m.chat, set_welcome_db)
  reply(`Sukses delete set welcome`)
}
break
case 'setleft': {
  if (!m.isGroup) return reply('Fitur Khusus Group!')
  if (!isAdmins) return reply('Fitur Khusus owner!')
  if (!text) return reply(`Kirim perintah: ${prefix + command} *teks_left*\n\n_Contoh_\n\n${prefix + command} Halo @user, Selamat tinggal dari @group`)
  if (isSetLeft(m.chat, set_left_db)) return reply(`Set left already active`)
  addSetLeft(q, m.chat, set_left_db)
  reply(`Successfully set left!`)
}
break
case 'changeleft': {
  if (!m.isGroup) return reply('Fitur Khusus Group!')
  if (!isAdmins) return reply('Fitur Khusus owner!')
  if (!text) return reply(`Kirim perintah: ${prefix + command} *teks_left*\n\n_Contoh_\n\n${prefix + command} Halo @user, Selamat tinggal dari @group`)
  if (isSetLeft(m.chat, set_left_db)) {
      changeSetLeft(q, m.chat, set_left_db)
      reply(`Sukses change set left teks!`)
  }
  else {
      addSetLeft(q, m.chat, set_left_db)
      reply(`Sukses change set left teks!`)
  }
}
break
case 'delsetleft': {
  if (!m.isGroup) return reply('Fitur Khusus Group!')
  if (!isAdmins) return reply('Fitur Khusus owner!')
  if (!isSetLeft(m.chat, set_left_db)) return reply(`Belum ada set left di sini..`)
  removeSetLeft(m.chat, set_left_db)
  reply(`Sukses delete set left`)
}
break
case 'antiwame': {
  if (!m.isGroup) return reply('Fitur Khusus Group!')
  if (!isAdmins) return reply('Fitur Khusus admin!')
  if (!isBotAdmins) return reply("Jadikan bot sebagai admin terlebih dahulu")
  if (args[0] === "on") {
      if (isAntiWame) return reply(`Udah aktif`)
      antiwame.push(m.chat)
      fs.writeFileSync('./src/antiwame.json', JSON.stringify(antiwame, null, 2))
      reply('Successfully Activate Antiwame In This Group')
  }
  else if (args[0] === "off") {
      if (!isAntiWame) return reply(`Udah nonaktif`)
      let anu = antiwame.indexOf(m.chat)
      antiwame.splice(anu, 1)
      fs.writeFileSync('./src/antiwame.json', JSON.stringify(antiwame, null, 2))
      reply('Successfully Disabling Antiwame In This Group')
  }
  else {
      reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
  }
}
break
case 'antiwame2': {
  if (!m.isGroup) return reply('Fitur Khusus Group!')
  if (!isAdmins) return reply('Fitur Khusus admin!')
  if (!isBotAdmins) return reply("Jadikan bot sebagai admin terlebih dahulu")
  if (args[0] === "on") {
      if (isAntiWame2) return reply(`Udah aktif`)
      antiwame2.push(m.chat)
      fs.writeFileSync('./src/antiwame2.json', JSON.stringify(antiwame2, null, 2))
      reply('Successfully Activate antiwame2 In This Group')
  }
  else if (args[0] === "off") {
      if (!isAntiWame2) return reply(`Udah nonaktif`)
      let anu = antiwame2.indexOf(m.chat)
      antiwame2.splice(anu, 1)
      fs.writeFileSync('./src/antiwame2.json', JSON.stringify(antiwame2, null, 2))
      reply('Successfully Disabling antiwame2 In This Group')
  }
  else {
      reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
  }
}
break
case 'close':
  case 'tutup': {
      if (!m.isGroup) return reply('Fitur Khusus Group!')
      if (!isAdmins) return reply('Fitur Khusus admin!')
      if (!isBotAdmins) return reply("Bot bukan admin")
      dica.groupSettingUpdate(m.chat, 'announcement')
      reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
  }
  break
  case 'open':
            case 'buka': {
                if (!m.isGroup) return reply('Fitur Khusus Group!')
                if (!isAdmins) return reply('Fitur Khusus admin!')
                if (!isBotAdmins) return reply("Bot bukan admin")
                dica.groupSettingUpdate(m.chat, 'not_announcement')
                reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
            }
            break
case "hidetag": case "h": {
if (!m.isGroup) return reply(mess.group)
if (!isAdmins) return reply(mess.admin)
dica.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
}
break;  
case 'stalk': {
  if (!itsMeDica) return reply(mess.owner)
  if (args[0] === "on") {
    stalk(true, reply)
  }
  else if (args[0] === "off") {
    stalk(false, reply)
  }
  else {
      reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
  }
}
break
case 'receipt': {
  if (!itsMeDica) return reply(mess.owner)
  if (args[0] === "on") {
    receipt(true, reply)
  }
  else if (args[0] === "off") {
    receipt(false, reply)
  }
  else {
      reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
  }
}
break
case 'tambah': {
  if (!q) {
    return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
  }
  var num_one = text.split(' ')[0];
  var num_two = text.split(' ')[1];
  if (!num_one) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  if (!num_two) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  var nilai_one = Number(num_one);
  var nilai_two = Number(num_two);
  reply(`Hasilnya adalah *${nilai_one + nilai_two}*`);
}
break;
case 'kurang': {
  if (!q) {
    return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
  }
  var num_one = text.split(' ')[0];
  var num_two = text.split(' ')[1];
  if (!num_one) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  if (!num_two) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  var nilai_one = Number(num_one);
  var nilai_two = Number(num_two);
  reply(`Hasilnya adalah *${nilai_one - nilai_two}*`);
}
break;
case 'kali': {
  if (!q) {
    return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
  }
  var num_one = text.split(' ')[0];
  var num_two = text.split(' ')[1];
  if (!num_one) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  if (!num_two) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  var nilai_one = Number(num_one);
  var nilai_two = Number(num_two);
  reply(`Hasilnya adalah *${nilai_one * nilai_two}*`);
}
break;
case 'bagi': {
  if (!q) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
  }
  var num_one = text.split(' ')[0];
  var num_two = text.split(' ')[1];
  if (!num_one) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  if (!num_two) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  var nilai_one = Number(num_one);
  var nilai_two = Number(num_two);
  reply(`Hasilnya adalah *${nilai_one / nilai_two}*`);
}
break;
 
    case 'delboard': {
  if (!itsMeDica) return reply(mess.owner);

  try {
    const data = fs.readFileSync('./src/balance.json', 'utf8');
    const balances = JSON.parse(data);

    const idYangInginDiHapus = Number(text) + "@s.whatsapp.net";
    const index = balances.findIndex(item => item.id === idYangInginDiHapus);
    if (index !== -1) {
      balances.splice(index, 1);

      
      const updatedData = JSON.stringify(balances, null, 2);
      fs.writeFileSync('./src/balance.json', updatedData, 'utf8');
      reply(`Nomer ${idYangInginDiHapus.split('@')[0]} berhasil dihapus.`);
    } else {
      reply(`Nomer ${idYangInginDiHapus.split('@')[0]} tidak ditemukan.`);
    }
  } catch (err) {
    reply('Terjadi kesalahan:', err);
  }
  }
  break;
              case 'resetboard': {
  if (!itsMeDica) return reply(mess.owner);
  try {
    const data = fs.readFileSync('./src/balance.json', 'utf8');
    const balances = JSON.parse(data);
    for (const balance of balances) {
      balance.total_lessblnc = 0;
      balance.total_addblnc = 0;
    }
    const updatedData = JSON.stringify(balances, null, 2);
    fs.writeFileSync('./src/balance.json', updatedData, 'utf8');
    
    reply('Perubahan berhasil disimpan.');
  } catch (err) {
    reply('Terjadi kesalahan:', err);
  }
  }
  break;
case "help" : {
	let anu = `Fitur ${command} tidak tersedia. Mungkin maksud Anda ${prefix}menu`
reply(anu);          
}              
break;              

case "req": {
  reply('_Request Anda telah diteruskan ke owner. Terima kasih atas Sarannya!_')
  const teks = `Ada Permintaan Request nih kak Dari ${pushname}
  
  ${text}`
  dica.sendMessage(ownerr+"@s.whatsapp.net",{text: `${teks}`}, {quoted: m})
}
break;
case 'updateprofit': {
  if (!itsMeDica) return;
const p = q.split(' ');
const data = JSON.parse(fs.readFileSync("./src/profit.json"));

if (p[0] === 'dev' || p[0] === 'silver' || p[0] === 'gold' || p[0] === 'user') {
  const newValue = toLvl(p[1]);
  if (isNaN(newValue)) {
    return reply('Harap masukkan angka yang valid.');
  }

  data.profit[p[0]] = newValue;
  data.output[p[0]] = p[1] +'%'
  fs.writeFileSync("./src/profit.json", JSON.stringify(data, null, 2));
  reply(`Profit untuk tipe pengguna "${p[0]}" berhasil diupdate menjadi ${q}%.`);
} else {
  reply('Tipe pengguna tidak valid. Gunakan salah satu dari "dev", "gold", "silver", atau "user".\n\nContoh Penggunaan\n.updateprofit user 10(yaitu keuntungan 10%)');
}
}
break;
case 'profit':{
	if (!itsMeDica) return;
	const dataProfit = JSON.parse(fs.readFileSync("./src/profit.json"));
	let prof = `Setting Profit saat ini
	
User: ${dataProfit.output.user}
Dev: ${dataProfit.output.dev}

Ketik .updateprofit untuk mengubah profit`
	reply(prof)
	
	}
	break
case "menu": {
  if (isBanned) return m.reply(`*You Have Been Banned*`);

  const menuText = `*${ucapanWaktu} Kak ${pushname ? pushname : "Anon"}.*
Berikut adalah daftar menu yang tersedia.


===============================
*DETAIL INFORMASI AKUN*

*Nama :* ${m.pushName} 
*UID     :* ${sender.replace("@s.whatsapp.net", "")}
===============================
${global.menu}


_*${packname}*_`;

dica.sendText(m.chat, menuText, m);
}
break;
case 'linkgroup': case 'linkgc': {
    if (!m.isGroup) return reply(mess.group)
    let response = await dica.groupInviteCode(m.chat)
    dica.sendText(m.chat, `*Ini kak link nya*\n\nhttps://chat.whatsapp.com/${response}\n\n»» Link Group : ${groupMetadata.subject}`, m, { detectLink: true })
            }
break;
case 'addsewa':{
  if (!itsMeDica) return reply(mess.owner)
  if (!text) return reply(`Gunakan dengan cara ${prefix+command} *linkgc waktu*\n\n*LIST WAKTU*\nd = days\nh = hours\nm = minutes\n\n*TRANSLATE*\ndays > hari\nhours > jam\nminutes > menit`)
  let ini_linknyaa = text.split(' ')[0] ? text.split(' ')[0] : text
  let ini_waktunya = text.split(' ')[1] ? text.split(' ')[1] : ''
  if (ini_waktunya.length <1) return reply(`harus di isi semua!!\n_contoh_\n${prefix+command} *linkgc waktu*\n\n*LIST WAKTU*\nd = days\nh = hours\nm = minutes\n\n*TRANSLATE*\ndays > hari\nhours > jam\nminutes > menit`)
  if (!isUrl(args[1])) return reply('Link tidak valid')
  var ini_urrrl = ini_linknyaa.split('https://chat.whatsapp.com/')[1]
  var data = await dica.groupAcceptInvite(ini_urrrl)
  if (_sewa.checkSewaGroup(data, sewa)) return reply(`Bot sudah disewa oleh grup tersebut!`)
  _sewa.addSewaGroup(data, ini_waktunya, sewa)
  reply(`Success Add Sewa Group Berwaktu!`)
  }
  break
  case 'delsewa':
if (!itsMeDica) return reply(mess.owner)
if (!m.isGroup) return reply(`Perintah ini hanya bisa dilakukan di Grup yang menyewa bot`)
if (!isSewa) return reply(`Bot tidak disewa di Grup ini`)
sewa.splice(_sewa.getSewaPosition(args[1] ? args[1] : from, sewa), 1)
fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 2))
reply(`Sukses`)
break
case 'checksewa':
case 'ceksewa':
  if (!m.isGroup) return reply(mess.group)
  if (!isSewa) return reply(`Bot tidak disewa pada grup ini!`)
  var expire = _sewa.getSewaExpired(from, sewa)
  var remainingTime = expire - Date.now()
  var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
  var hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
  var remainingTimeString = `Sewa grup ini akan berakhir dalam 
*${days}* hari, *${hours}* jam, *${minutes}* menit lagi.`
  reply(remainingTimeString)
  break;
  case 'cektransaksi':
  if (fs.existsSync(riwayatPath + `buyer/${sender.split('@')[0]}.json`)) {
    const riwayatData = JSON.parse(fs.readFileSync(riwayatPath + "orderdigi.json"));
  
    if (text) {
      const filteredData = riwayatData.filter(item => item.ref_id === text);
      if (filteredData.length === 0) return reply(`Data dengan ref_id ${text} tidak ditemukan 🥲`);

      reply(`╔━━━━[ ID TRX: ${text} ]━━━•
┃• Buyer: ${filteredData[0].buyer}
┃• ID Layanan: ${filteredData[0].buyer_sku_code}
┃• Target: ${filteredData[0].customer_no}
┃• Kategori: ${filteredData[0].kategori}
┃• Brand: ${filteredData[0].brand}
┃• Layanan: ${filteredData[0].product_name}
┃• Harga: Rp${toRupiah(filteredData[0].biaya)}   
┃• Status: ${filteredData[0].status}
┃• Waktu Pemesanan: ${filteredData[0].date} | ${filteredData[0].date}
${filteredData[0].sn ? `╚══════✪[ SN ]✪══════\n${filteredData[0].sn.split('/').join('\n')}\n✪═════════════════✪`  : '╚━━━━━━━━━━━━━•◇'}`);
    } else { 
      var arr_rows = [];
      for (let x of riwayatData) {
        arr_rows.push({
          refid: x.ref_id,
          buyer: x.buyer_sku_code
        });
      }

      var infoMsg = `*Riwayat order 20 data terakhir*\n*${m.pushName}:* ${itsMeDica ? 'OWNER': isGOLD ? 'GOLD' : isPRO ? 'SILVER' : 'BRONZE'}\n\n╔━━━━『 *_ID_* 』━━━•◇\n`;
      var startIndex = Math.max(0, arr_rows.length - 20);
      for (let i = arr_rows.length - 1; i >= startIndex; i--) {
        infoMsg += `┃• ${arr_rows.length - i}. ${arr_rows[i].refid}: - (${arr_rows[i].buyer}) \n`;
      }
      infoMsg += `╚━━━━━━━━•◇`;

      dica.sendMessage(from, { text: infoMsg }); 
    }
  } else {
    reply(`Belum ada Riwayat yang terdaftar 🥲`);
  }
  break;
  case 'c':
    if (!itsMeDica) return reply(mess.owner)
  if (fs.existsSync(riwayatPath + "orderdigi.json")) {
    const riwayatData = JSON.parse(fs.readFileSync(riwayatPath + "orderdigi.json"));
  
    if (text) {
      const filteredData = riwayatData.filter(item => item.ref_id === text);
      if (filteredData.length === 0) return reply(`Data dengan ref_id ${text} tidak ditemukan 🥲`);

      reply(`╔━━━━[ ID TRX: ${text} ]━━━•
┃• Buyer: ${filteredData[0].buyer}
┃• ID Layanan: ${filteredData[0].buyer_sku_code}
┃• Target: ${filteredData[0].customer_no}
┃• Kategori: ${filteredData[0].kategori}
┃• Brand: ${filteredData[0].brand}
┃• Layanan: ${filteredData[0].product_name}
┃• Harga: Rp${toRupiah(filteredData[0].biaya)}   
┃• Status: ${filteredData[0].status}
┃• Waktu Pemesanan: ${filteredData[0].date} | ${filteredData[0].date}
${filteredData[0].sn ? `╚══════✪[ SN ]✪══════\n${filteredData[0].sn.split('/').join('\n')}\n✪═════════════════✪`  : '╚━━━━━━━━━━━━━•◇'}`);
    } else { 
      var arr_rows = [];
      for (let x of riwayatData) {
        arr_rows.push({
          refid: x.ref_id,
          buyer: x.buyer_sku_code
        });
      }

      var infoMsg = `*Riwayat order 20 data terakhir*\n\n╔━━━━『 *_ID_* 』━━━•◇\n`;
      var startIndex = Math.max(0, arr_rows.length - 20);
      for (let i = arr_rows.length - 1; i >= startIndex; i--) {
        infoMsg += `┃• ${arr_rows.length - i}. ${arr_rows[i].refid}: - (${arr_rows[i].buyer}) \n`;
      }
      infoMsg += `╚━━━━━━━━•◇`;

      dica.sendMessage(from, { text: infoMsg }); 
    }
  } else {
    reply(`Belum ada Riwayat yang terdaftar 🥲`);
  }
  break;
// END
              
}
} catch (err) {
m.reply(util.format(err));
}
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
