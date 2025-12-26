import { loadData } from './storage.js';

function login(password) {
    const settings = loadData('settings');

    // Eğer settings yoksa varsayılan şifre
    const correctPassword = settings?.adminPassword || "1234";

    return password === correctPassword;
}

function logout() {
    localStorage.removeItem('loggedIn');
}

function isLoggedIn() {
    return localStorage.getItem('loggedIn') === "true";
}

export { login, logout, isLoggedIn };
