import { saveData, loadData } from '../core/storage.js';

let vehicles = loadData('vehicles') || [];

function addVehicle(vehicle) {
    vehicles.push(vehicle);
    saveData('vehicles', vehicles);
}

function removeVehicle(id) {
    vehicles = vehicles.filter(v => v.id !== id);
    saveData('vehicles', vehicles);
}

function getVehicles() {
    return vehicles;
}

export { addVehicle, removeVehicle, getVehicles };