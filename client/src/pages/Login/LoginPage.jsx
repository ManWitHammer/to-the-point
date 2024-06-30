import axios from 'axios'
import { useState, useEffect } from 'react'
import styles from './Login.module.css'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";
import { useUserStore } from '../../../store/userStore.js'

export default function Login() {
    const login = useUserStore(state => state.login)
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [apiErrors, setApiErrors] = useState("")
    const [loadThis, setloadThis] = useState("Войти")
    const [isHovered, setIsHovered] = useState(false)
    const [ip, setIp] = useState("")

    useEffect(() => {
        document.title = "To the point | Логин"
        function getIPFromAmazon() {
            fetch('https://checkip.amazonaws.com/')
                .then((res) => res.text())
                .then((data) => {
                    setIp(data.toString().trim());
                });
        }
        getIPFromAmazon()
    }, [])

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const yourAccount = async (e) => {
        try {
            const date = new Date();
            setloadThis('Ждите пж')
            e.preventDefault();
            if (email === '' || password === '') {
                setApiErrors('Заполните все поля')
                setloadThis('Войти')
                return;
            }
            setApiErrors('')
            const res = await login(email, password, ip, date)
            localStorage.setItem('accessToken', res)
            setloadThis('Войти')
            alert('Вы успешно зарегистрировались')
            navigate('../')
        } catch (error) {
            setloadThis('Войти')
            if (error.message) {
                setApiErrors(error.message)
            }
            else {
                setApiErrors("Ошибка сервера, попробуйте позже")
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
                        autoComplete="off"
                    />
                    <label>Пароль</label>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Введите password"
                        autoComplete="off"
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