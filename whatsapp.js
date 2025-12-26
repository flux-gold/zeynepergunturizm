import { loadData } from '../core/storage.js';
import { encodeMessage } from '../core/helpers.js';

function getWhatsAppLink(message) {
    const settings = loadData('settings') || {};
    const number = settings.whatsappNumber || "0542123970";
    return `https://wa.me/${number}?text=${encodeMessage(message)}`;
}

function sendTransferMessage(transfer) {
    const msg = `Merhaba, transfer detayınız:\n` +
                `Başlangıç: ${transfer.start}\n` +
                `Varış: ${transfer.end}\n` +
                `Saat: ${transfer.time}\n` +
                `Kişi: ${transfer.passengers}`;
    const link = getWhatsAppLink(msg);
    window.open(link, '_blank');
}

export { getWhatsAppLink, sendTransferMessage };