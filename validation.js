import { getTransfers } from './transfer.js';
import { getDrivers } from './driver.js';
import { getVehicles } from './vehicle.js';

function checkDriverVehicleConflict(driverId, vehicleId, time) {
    const transfers = getTransfers();
    return transfers.some(t => t.time === time && (t.driverId === driverId || t.vehicleId === vehicleId));
}

function checkVehicleCapacity(vehicleId, passengers) {
    const vehicles = getVehicles();
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle && passengers <= vehicle.capacity;
}

export { checkDriverVehicleConflict, checkVehicleCapacity };