import { saveData, loadData } from '../core/storage.js';

const settings = loadData('settings') || {
    adminPassword: "1234",
    whatsappNumber: "0542123970",
    currencies: ["TL", "EUR", "USD", "GBP", "JPY"],
    colors: {
        primary: "#002147",
        accent: "#BFA12B",
        background: "#FFFFFF",
        hover: "#003366",
        riskOk: "#28A745",
        riskWarn: "#FFAA1C",
        riskCritical: "#D32F2F"
    },
    startLocations: ["Karaman Merkez"]
};

// Ayarlar UI oluştur
function renderSettingsUI(container) {
    container.innerHTML = `
        <h2>Ayarlar</h2>
        <label>Admin Şifre: <input type="password" id="adminPassword" value="${settings.adminPassword}"></label><br>
        <label>WhatsApp Numarası: <input type="text" id="whatsappNumber" value="${settings.whatsappNumber}"></label><br>
        <label>Başlangıç Noktaları (virgül ile): <input type="text" id="startLocations" value="${settings.startLocations.join(',')}"></label><br>
        <button id="saveSettings">Kaydet</button>
    `;
    document.getElementById('saveSettings').addEventListener('click', () => {
        settings.adminPassword = document.getElementById('adminPassword').value;
        settings.whatsappNumber = document.getElementById('whatsappNumber').value;
        settings.startLocations = document.getElementById('startLocations').value.split(',').map(s => s.trim());
        saveData('settings', settings);
        alert("Ayarlar kaydedildi.");
    });
}

export { renderSettingsUI };