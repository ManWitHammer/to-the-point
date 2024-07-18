import { useState, useEffect, useRef } from 'react'
import styles from './Login.module.css'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";
import { MdOutlineMail, MdOutlineLock } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useUserStore } from '../../../store/userStore.js'

export default function Login() {
    const login = useUserStore(state => state.login)
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [apiErrors, setApiErrors] = useState("")
    const [loadThis, setloadThis] = useState("Войти")
    const [isHovered, setIsHovered] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [rickRoll, setRickRoll] = useState(false);
    const navigateRef1 = useRef(null);
    const navigateRef2 = useRef(null);
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

    const handleRickRoll = () => {
        setRickRoll(true)
    }

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown' && document.activeElement === navigateRef1.current) {
            e.preventDefault();
            navigateRef2.current.focus();
        } else if (e.key === 'ArrowUp' && document.activeElement === navigateRef2.current) {
            e.preventDefault();
            navigateRef1.current.focus();
        }
    };

    const handleEye = () => {
        setIsPasswordVisible(that => !that);
    }

    const yourAccount = async (e) => {
        e.preventDefault();
        try {
            const date = new Date();
            setloadThis('Ждите пж')
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
                <form onKeyDown={handleKeyDown} onSubmit={yourAccount}>
                    {apiErrors !== "" ? <p className={styles["error"]}>{apiErrors}</p> : ""}
                    <label><MdOutlineMail/>Почта</label>
                    <input 
                        ref={navigateRef1}
                        type="email" 
                        name="email" 
                        placeholder="Введите email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="off"
                    />
                    <label><MdOutlineLock/>Пароль</label>
                    <div className={styles["password"]}>
                        <input 
                            ref={navigateRef2}
                            type={isPasswordVisible ? "text" : "password"} 
                            name="password"
                            placeholder="Введите password"
                            autoComplete="off"
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className={styles["passwordEye"]} onClick={handleEye}>{isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline/>}</div>
                    </div>
                    <button type="submit" onSubmit={yourAccount}>{loadThis}</button>
                </form>
                <a  
                    onClick={handleRickRoll}
                    className={styles['link']} 
                    id='link'>
                    Вы забыли пароль?
                </a>
            </div>
            <div className={styles["rickRoll"]} style={rickRoll ? { display: "block", zIndex: 10 } : { display: "none", zIndex: -1 }}>
                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=${rickRoll ? "1" : "0"}`} title="Rick Astley - Never Gonna Give You Up (Official Music Video)" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
    )
}