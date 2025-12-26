import { login } from '../core/auth.js';

function renderLogin(container){
    container.innerHTML = `
        <div id="login-box" style="max-width:300px;margin:auto;padding:20px;border:1px solid #002147;background:#FFFFFF;">
            <h2>Admin Girişi</h2>
            <input type="password" id="password" placeholder="Şifre" style="width:100%;padding:8px;margin:10px 0;">
            <button id="loginBtn" style="width:100%;padding:10px;background:#BFA12B;color:#FFFFFF;border:none;">Giriş</button>
        </div>
    `;

    const pwdInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');

    loginBtn.addEventListener('click', () => {
        const pwd = pwdInput.value.trim();
        if(login(pwd)){
            localStorage.setItem('loggedIn', "true");
            alert("Giriş başarılı");
            window.location.reload();
        } else {
            alert("Hatalı şifre");
        }
    });

    // Enter tuşu ile giriş
    pwdInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') loginBtn.click();
    });
}

export { renderLogin };
