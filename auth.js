import { loadData } from './storage.js';

/**
 * Giriş kontrolü
 * @param {string} password - Kullanıcının girdiği şifre
 * @returns {boolean} - Doğruysa true
 */
function login(password){
    const settings = loadData('settings'); 
    const correctPassword = settings?.adminPassword || "1234"; // varsayılan şifre
    return password === correctPassword;
}

/**
 * Çıkış işlemi
 */
function logout(){
    localStorage.removeItem('loggedIn');
}

/**
 * Oturum kontrolü
 * @returns {boolean} - Giriş yapılmışsa true
 */
function isLoggedIn(){
    return localStorage.getItem('loggedIn') === "true";
}

export { login, logout, isLoggedIn };
