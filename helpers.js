// Para birimi ve diğer yardımcı fonksiyonlar
function formatCurrency(amount, currency) {
    return `${currency} ${amount.toFixed(2)}`;
}

function encodeMessage(msg) {
    return encodeURIComponent(msg);
}

// Basit kuş uçuşu mesafe hesaplama (Haversine)
function getDistance(lat1, lon1, lat2, lon2){
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

export { formatCurrency, encodeMessage, getDistance };