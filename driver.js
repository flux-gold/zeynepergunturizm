import { saveData, loadData } from '../core/storage.js';

let drivers = loadData('drivers') || [];

function addDriver(driver) {
    drivers.push(driver);
    saveData('drivers', drivers);
}

function removeDriver(id) {
    drivers = drivers.filter(d => d.id !== id);
    saveData('drivers', drivers);
}

function getDrivers() {
    return drivers;
}

export { addDriver, removeDriver, getDrivers };