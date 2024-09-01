import React, { useState, useEffect } from "react";
import '../../css/login-page.css';
import logoImage from '../../images/cwlogo.png';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks.js/useAuth"

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { setAuth } = useAuth();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const requestBody = {
                username,
                password
            }

            const options = {
                method: "POST",
                headers: new Headers({ 'content-type': 'application/json' }),
                body: JSON.stringify(requestBody)
            }

            const response = await fetch("http://127.0.0.1:8000/users/login/", options);

            if (response.status === 401) setErrorMessage("Kullancı Adı Veya Şifre Yanlış Girildi !");

            if (response.status === 200) {

                const data = await response.json()

                const userAuth = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    roles: data.groups,
                    token: data.token
                }

                console.log(data);
                //set Auth Auth-Context and Local Storage
                setAuth(userAuth)
                localStorage.setItem('auth', JSON.stringify(userAuth))

                navigate("/layout");
            }

        } catch (e) {
            setErrorMessage("Beklenmedik Bir Sorun Oluştu !")
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-image-container">
                    <img className="login-image" src={logoImage} alt="CreditWest Software Genius Check Scanner"></img>
                    <p className="check-scanner-text">CHECK SCANNER</p>
                    <p className="logo-text">CREDIT<span>W</span>EST SOFTWARE GENIUS</p>

                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <h3 className="login-title">Giriş</h3>
                    <p>Lütfen giriş yapmak için kullanıcı adınızı ve şifrenizi giriniz. Eğer kullanıcı adınızı veya şifrenizi bilmiyorsanız lütfen admin ile iletişime geçiniz.</p>
                    <div className="user-info">
                        <label htmlFor="username">Kullanıcı adı</label>
                        <input type="text" id="username" name="username" placeholder="Kullanıcı adı" maxLength="20" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <label htmlFor="password">Şifre</label>
                        <input type="password" id="password" name="password" placeholder="Şifre" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="login-button">OTURUM AÇ</button>
                    {errorMessage && <p className="error-text">{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
