import { renderSettingsUI } from './ui/settings.js';
import { getDrivers, addDriver, removeDriver } from './logic/driver.js';
import { getVehicles, addVehicle, removeVehicle } from './logic/vehicle.js';
import { getTransfers, addTransfer, removeTransfer } from './logic/transfer.js';
import { initMap, drawRoute } from './logic/map.js';
import { sendTransferMessage } from './logic/whatsapp.js';
import { checkDriverVehicleConflict, checkVehicleCapacity } from './logic/validation.js';

// Dashboard butonları
const btnSettings = document.getElementById('btn-settings');
const btnDrivers = document.getElementById('btn-drivers');
const btnVehicles = document.getElementById('btn-vehicles');
const btnTransfers = document.getElementById('btn-transfers');
const btnMap = document.getElementById('btn-map');
const btnReports = document.getElementById('btn-reports');
const mainContent = document.getElementById('main-content');

// Ayarlar ekranı
btnSettings.addEventListener('click', () => {
    renderSettingsUI(mainContent);
});

// Şoförler ekranı
btnDrivers.addEventListener('click', () => {
    mainContent.innerHTML = `<h2>Şoförler</h2><ul id="driver-list"></ul>
    <input type="text" id="newDriverName" placeholder="Şoför Adı">
    <button id="addDriverBtn">Ekle</button>`;
    const listEl = document.getElementById('driver-list');
    getDrivers().forEach(d => {
        const li = document.createElement('li');
        li.textContent = `${d.name} `;
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Sil';
        delBtn.addEventListener('click', () => {
            removeDriver(d.id);
            li.remove();
        });
        li.appendChild(delBtn);
        listEl.appendChild(li);
    });

    document.getElementById('addDriverBtn').addEventListener('click', () => {
        const name = document.getElementById('newDriverName').value.trim();
        if(name){
            const id = Date.now().toString();
            addDriver({id, name});
            const li = document.createElement('li');
            li.textContent = name + ' ';
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Sil';
            delBtn.addEventListener('click', () => { removeDriver(id); li.remove(); });
            li.appendChild(delBtn);
            listEl.appendChild(li);
            document.getElementById('newDriverName').value = '';
        }
    });
});

// Araçlar ekranı
btnVehicles.addEventListener('click', () => {
    mainContent.innerHTML = `<h2>Araçlar</h2><ul id="vehicle-list"></ul>
    <input type="text" id="newVehicleName" placeholder="Araç Adı">
    <input type="number" id="newVehicleCapacity" placeholder="Kapasite">
    <button id="addVehicleBtn">Ekle</button>`;
    const listEl = document.getElementById('vehicle-list');
    getVehicles().forEach(v => {
        const li = document.createElement('li');
        li.textContent = `${v.name} (${v.capacity}) `;
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Sil';
        delBtn.addEventListener('click', () => { removeVehicle(v.id); li.remove(); });
        li.appendChild(delBtn);
        listEl.appendChild(li);
    });

    document.getElementById('addVehicleBtn').addEventListener('click', () => {
        const name = document.getElementById('newVehicleName').value.trim();
        const capacity = parseInt(document.getElementById('newVehicleCapacity').value);
        if(name && capacity){
            const id = Date.now().toString();
            addVehicle({id, name, capacity});
            const li = document.createElement('li');
            li.textContent = `${name} (${capacity}) `;
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Sil';
            delBtn.addEventListener('click', () => { removeVehicle(id); li.remove(); });
            li.appendChild(delBtn);
            listEl.appendChild(li);
            document.getElementById('newVehicleName').value = '';
            document.getElementById('newVehicleCapacity').value = '';
        }
    });
});

// Transferler ekranı
btnTransfers.addEventListener('click', () => {
    mainContent.innerHTML = `<h2>Transferler</h2>
        <ul id="transfer-list"></ul>
        <input type="text" id="start" placeholder="Başlangıç">
        <input type="text" id="end" placeholder="Varış">
        <input type="time" id="time" placeholder="Saat">
        <input type="number" id="passengers" placeholder="Kişi">
        <select id="driverSelect"></select>
        <select id="vehicleSelect"></select>
        <button id="addTransferBtn">Ekle</button>
        <button id="sendMsgBtn">WhatsApp Gönder</button>`;

    const driverSelect = document.getElementById('driverSelect');
    getDrivers().forEach(d => { 
        const opt = document.createElement('option'); 
        opt.value = d.id; opt.textContent = d.name; driverSelect.appendChild(opt);
    });

    const vehicleSelect = document.getElementById('vehicleSelect');
    getVehicles().forEach(v => { 
        const opt = document.createElement('option'); 
        opt.value = v.id; opt.textContent = `${v.name} (${v.capacity})`; vehicleSelect.appendChild(opt);
    });

    const listEl = document.getElementById('transfer-list');
    getTransfers().forEach(t => {
        const li = document.createElement('li');
        li.textContent = `${t.start} → ${t.end} Saat: ${t.time} Kişi: ${t.passengers}`;
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Sil';
        delBtn.addEventListener('click', () => { removeTransfer(t.id); li.remove(); });
        li.appendChild(delBtn);
        listEl.appendChild(li);
    });

    document.getElementById('addTransferBtn').addEventListener('click', () => {
        const start = document.getElementById('start').value;
        const end = document.getElementById('end').value;
        const time = document.getElementById('time').value;
        const passengers = parseInt(document.getElementById('passengers').value);
        const driverId = driverSelect.value;
        const vehicleId = vehicleSelect.value;

        if(!checkDriverVehicleConflict(driverId, vehicleId, time) && checkVehicleCapacity(vehicleId, passengers)){
            const id = Date.now().toString();
            addTransfer({id, start, end, time, passengers, driverId, vehicleId});
            const li = document.createElement('li');
            li.textContent = `${start} → ${end} Saat: ${time} Kişi: ${passengers}`;
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Sil';
            delBtn.addEventListener('click', () => { removeTransfer(id); li.remove(); });
            li.appendChild(delBtn);
            listEl.appendChild(li);
        } else {
            alert("Çakışma veya kapasite hatası!");
        }
    });

    document.getElementById('sendMsgBtn').addEventListener('click', () => {
        const transfers = getTransfers();
        if(transfers.length) sendTransferMessage(transfers[transfers.length - 1]);
    });
});

// Rota ekranı
btnMap.addEventListener('click', () => {
    mainContent.innerHTML = `<h2>Rota Görünümü</h2><div id="map" style="height:400px;"></div><ol id="address-list"></ol>`;
    const transfers = getTransfers();
    const addresses = transfers.map(t => t.start).concat(transfers.length ? transfers[transfers.length-1].end : []);
    drawRoute(addresses);
});

// Rapor ekranı
btnReports.addEventListener('click', () => {
    mainContent.innerHTML = `<h2>Gün Sonu Raporu</h2><ul id="report-list"></ul>`;
    const listEl = document.getElementById('report-list');
    const transfers = getTransfers();
    transfers.forEach(t => {
        const li = document.createElement('li');
        li.textContent = `${t.start} → ${t.end} Saat: ${t.time} Kişi: ${t.passengers}`;
        listEl.appendChild(li);
    });
});