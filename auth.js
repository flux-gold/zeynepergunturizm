// Basit şifreli giriş
import { loadData } from './storage.js';

function login(password) {
    const settings = loadData('settings') || {};
    const correctPassword = settings.adminPassword || "1234";
    return password === correctPassword;
}

export { login };