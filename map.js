import { geocodeAddress } from './helpers.js';

let map;
let routeLayer;

function initMap(containerId = 'map') {
    map = L.map(containerId).setView([37.1754, 33.2287], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}

async function drawRoute(addresses) {
    if(!map) initMap();
    if(routeLayer) map.removeLayer(routeLayer);

    const coords = [];
    const listEl = document.getElementById('address-list');
    listEl.innerHTML = '';

    for(const addr of addresses){
        const c = await geocodeAddress(addr);
        if(c){
            coords.push(c);
            L.marker(c).addTo(map).bindPopup(addr);
            const li = document.createElement('li');
            li.textContent = addr;
            listEl.appendChild(li);
        } else {
            console.warn("Adres bulunamadı:", addr);
        }
    }

    if(coords.length > 1){
        routeLayer = L.polyline(coords, {color: 'blue'}).addTo(map);
        map.fitBounds(L.polyline(coords).getBounds());
    }
}

export { initMap, drawRoute };