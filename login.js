import { login } from '../core/auth.js';

const loginBtn = document.getElementById('login-btn');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');
const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');

loginBtn.addEventListener('click', () => {
    if(login(passwordInput.value)) {
        loginScreen.classList.add('hidden');
        dashboard.classList.remove('hidden');
    } else {
        loginError.classList.remove('hidden');
    }
});