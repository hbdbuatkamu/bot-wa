const fs = require('fs');
const riwayatPath = './db/riwayat/';
const expiredDate = new Date();
expiredDate.setMilliseconds(expiredDate.getMilliseconds() + (90 * 24 * 60 * 60 * 1000));
const now = new Date();
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');
const time = `${hours}:${minutes}:${seconds}`;
const date = `${new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta" })}`
const waktu = `${time} ${date}`

function simpanRiwayatOrder(data_topup, pushname, status, sn, sender) {

    try {
        let riwayat = [];

        if (fs.existsSync(riwayatPath + "orderdigi.json")) {
            const existingData = JSON.parse(fs.readFileSync(riwayatPath + "orderdigi.json", { encoding: 'utf-8' }));
            riwayat = existingData;
        }

        riwayat.unshift({
            buyer: pushname,
            ref_id: data_topup.ref_id,
            time: time,
            date: date,
            expired: expiredDate.getTime(),
            customer_no: data_topup.data.nomer,
            buyer_sku_code: data_topup.ID,
            biaya: data_topup.data.price,
            product_name: data_topup.data.product_name,
            kategori: data_topup.data.category,
            brand: data_topup.data.brand,
            status: status,
            sn: sn
        });

       fs.writeFileSync(riwayatPath + "orderdigi.json", JSON.stringify(riwayat, null, 2));
       fs.writeFileSync(riwayatPath + 'buyer/' + sender, JSON.stringify(riwayat, null, 2));
    } catch (error) {
        console.error('Terjadi kesalahan saat menyimpan riwayat order:', error);
    }
}

module.exports = { simpanRiwayatOrder };
