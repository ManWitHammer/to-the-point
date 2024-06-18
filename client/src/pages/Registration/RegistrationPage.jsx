import axios from 'axios'
import { useState, useEffect } from 'react'
import styles from './Registration.module.css'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { FaChevronLeft } from "react-icons/fa";

export default function Registration() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [verifyEmail, setVerifyEmail] = useState('');
    const [errorPass, setErrorPass] = useState('');
    const [verifyPass, setVerifyPass] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassAgain, setErrorPassAgain] = useState('');
    const [verifyPassAgain, setVerifyPassAgain] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [apiErrors, setApiErrors] = useState("")
    const [loadThis, setloadThis] = useState("Зарегистрироваться")
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    useEffect(() => {
        function isValidEmail(emaail) {
            // Простая регулярка для проверки формата email
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return emailRegex.test(emaail);
        }
        if (isValidEmail(email)) {
            setVerifyEmail('email is valid')
            setErrorEmail('')
        } else if (!isValidEmail(email) && email !== '') {
            setErrorEmail('email is not valid')
            setVerifyEmail('')
        } else if (email === '') {
            setVerifyEmail('')
            setErrorEmail('')
        }
    }, [email])

    useEffect(() => {
        function isValidLength(password, min, max) {
            const length = password.length;
            return length >= min && length <= max;
          }
        if (isValidLength(password, 6, 32)) {
            setVerifyPass('Малайчынка')
            setErrorPass('')
        } else if (!isValidLength(password, 6, 32) && password !== '') {
            setErrorPass('Количство символов должно быть от 6 до 32')
            setVerifyPass('')
        } else if (password === '') {
            setVerifyPass('')
            setErrorPass('')
        }
    }, [password])

    useEffect(() => {
        function isValidLength(password, min, max) {
            const length = password.length;
            return length >= min && length <= max;
        }
        if (password == passwordAgain && passwordAgain !== '') {
            setVerifyPassAgain('Пароли совпадают')
            setErrorPassAgain('')
        } else if (password == passwordAgain && passwordAgain !== '' && !isValidLength(password, 6, 32)) {
            setVerifyPassAgain('')
            setErrorPassAgain('Количство символов должно быть от 6 до 32')
        } else if (password !== passwordAgain && passwordAgain !== '') {
            setErrorPassAgain('Пароли не совпадают')
            setVerifyPassAgain('')
        } else if (passwordAgain === '') {
            setVerifyPassAgain('')
            setErrorPassAgain('')
        } 
    }, [passwordAgain])

    const yourAccount = async (e) => {
        try {
            setloadThis('Ждите пж')
            e.preventDefault();
            if (email === '' || password === '' || passwordAgain === '') {
                setApiErrors('Заполните все поля')
                setloadThis('Зарегистрироваться')
                return;
            }
            if (errorPass !== "" || errorPassAgain!== "" || errorEmail!== "") {
                setApiErrors('Хмммм, что-то здесь не так')
                setloadThis('Зарегистрироваться')
                return;
            }
            setVerifyPassAgain('')
            setVerifyPass('')
            setVerifyEmail('')
            setApiErrors('')
            const data = {
                email,
                password,
            }
            const url = 'http://localhost:3000/api/registration'
            const res = await axios.post(url, data, { withCredentials: true })
            setloadThis('Зарегистрироваться')
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
                    <div 
                        className={styles["login"]}
                        onClick={() => navigate('../login')}
                        onMouseEnter={handleHover} 
                        onMouseLeave={handleMouseLeave}
                    >
                    <h2>Вход</h2>
                    </div>
                    <div className={styles['register']}>
                        <h2 className={cn(styles['upText'], {
                            [styles['onHovered-underline-down']]: isHovered,
                            [styles['onHovered-underline-up']]: !isHovered,
                        })}>Регистрация</h2>
                    </div>
                </div>
                <form>
                    {apiErrors !== "" ? <p className={styles["error"]}>{apiErrors}</p> : ""}
                    <label>Почта</label>
                    {errorEmail !== "" ? <p className={styles["error"]}>{errorEmail}</p> : ""}
                    {verifyEmail !== "" ? <p className={styles["verify"]}>{verifyEmail}</p> : ""}
                    <input 
                        style={errorEmail !== "" ? {borderBottom: "2px solid red"} : {}}
                        type="email" 
                        name="email" 
                        placeholder="Введите email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label>Пароль</label>
                    {errorPass !== "" ? <p className={styles["error"]}>{errorPass}</p> : ""}
                    {verifyPass !== "" ? <p className={styles["verify"]}>{verifyPass}</p> : ""}
                    <input 
                        style={errorPass !== "" ? {borderBottom: "2px solid red"} : {}}
                        type="password" 
                        name="password"
                        placeholder="Введите password"
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label>Подтвердите пароль</label>
                    {errorPassAgain !== "" ? <p className={styles["error"]}>{errorPassAgain}</p> : ""}
                    {verifyPassAgain !== "" ? <p className={styles["verify"]}>{verifyPassAgain}</p> : ""}
                    <input 
                        style={errorPassAgain !== "" ? {borderBottom: "2px solid red"} : {}}
                        type="password" 
                        name="password" 
                        placeholder="Введите password" 
                        value={passwordAgain}
                        onChange={e => setPasswordAgain(e.target.value)}
                    />
                    <button type="submit" onClick={yourAccount}>{loadThis}</button>
                </form>
            </div>
        </div>
    )
}