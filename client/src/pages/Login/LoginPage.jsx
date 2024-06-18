import axios from 'axios'
import { useState, useEffect } from 'react'
import styles from './Login.module.css'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [apiErrors, setApiErrors] = useState("")
    const [loadThis, setloadThis] = useState("Войти")
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const yourAccount = async (e) => {
        try {
            setloadThis('Ждите пж')
            e.preventDefault();
            if (email === '' || password === '') {
                setApiErrors('Заполните все поля')
                setloadThis('Войти')
                return;
            }
            setApiErrors('')
            const data = {
                email,
                password,
            }
            const url = 'http://localhost:3000/api/login'
            const res = await axios.post(url, data, { withCredentials: true })
            console.log(res)
            setloadThis('Войти')
            if (localStorage.getItem('accessToken') !== null) {
                localStorage.removeItem('accessToken')
                localStorage.setItem('accessToken', res.data.accessToken)
            }
            localStorage.setItem('accessToken', res.data.accessToken)
            console.log(res.data)
            alert('Вы успешно зарегистрировались')
            navigate('../')
        } catch (error) {
            setloadThis('Войти')
            if (error.response) {
                setApiErrors(error.response.data.message);
            } else if (error.request) {
                setApiErrors('Нет ответа от сервера');
            } else {
                setApiErrors('Ошибка соединения');
            }
        }
    }
    return (
        <div className={styles["auth-container"]}>
            <div 
                className={styles["toHome"]}
                onClick={() => navigate('../')}
            ><FaChevronLeft/></div>
            <div className={styles["container"]}>
                <div className={styles["auth"]}>
                    <div className={styles["login"]}>
                        <h2 className={cn(styles['upText'], {
                                [styles['onHovered-underline-down']]: isHovered,
                                [styles['onHovered-underline-up']]: !isHovered,
                            })}
                        >Вход
                        </h2>
                    </div>
                    <div
                        className={styles['register']}
                        onClick={() => navigate('../registration')}
                        onMouseEnter={handleHover} 
                        onMouseLeave={handleMouseLeave}
                    >
                        <h2>Регистрация</h2>
                    </div>
                </div>
                <form>
                    {apiErrors !== "" ? <p className={styles["error"]}>{apiErrors}</p> : ""}
                    <label>Почта</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Введите email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autocomplete="off"
                    />
                    <label>Пароль</label>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Введите password"
                        autocomplete="off"
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" onClick={yourAccount}>{loadThis}</button>
                </form>
                <a
                    to='../registration'
                    className={styles['link']} 
                    id='link'>
                    Вы забыли пароль?
                </a>

            </div>
        </div>
    )
}