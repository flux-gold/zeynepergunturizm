import { saveData, loadData } from '../core/storage.js';

let transfers = loadData('transfers') || [];

function addTransfer(transfer) {
    transfers.push(transfer);
    saveData('transfers', transfers);
}

function removeTransfer(id) {
    transfers = transfers.filter(t => t.id !== id);
    saveData('transfers', transfers);
}

function getTransfers() {
    return transfers;
}

export { addTransfer, removeTransfer, getTransfers };