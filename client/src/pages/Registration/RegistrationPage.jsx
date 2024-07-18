import { FaRegUser } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react'
import styles from './Registration.module.css'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { FaChevronLeft } from "react-icons/fa";
import { MdOutlineMail, MdOutlineLock } from "react-icons/md";
import { useUserStore } from '../../../store/userStore.js'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function Registration() {
    const registration = useUserStore(state => state.registration)
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPass, setErrorPass] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassAgain, setErrorPassAgain] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [apiErrors, setApiErrors] = useState("")
    const [loadThis, setloadThis] = useState("Зарегистрироваться")
    const [isHovered, setIsHovered] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigateRef1 = useRef(null);
    const navigateRef2 = useRef(null);
    const navigateRef3 = useRef(null);
    const navigateRef4 = useRef(null);
    const navigateRef5 = useRef(null);

    useEffect(() => {
        document.title = "To the point | Регистрация"
    }, [])

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
            setErrorEmail('')
        } else if (!isValidEmail(email) && email !== '') {
            setErrorEmail('email is not valid')
        } else if (email === '') {
            setErrorEmail('')
        }
    }, [email])

    useEffect(() => {
        function isValidLength(password, min, max) {
            const length = password.length;
            return length >= min && length <= max;
        }
        const regex1 = /\d/;
        const regex2 = /[a-zA-Zа-яА-Я]/;

        if (!isValidLength(password, 6, 20) && password !== '') {
            setErrorPass('Количество символов должно быть от 6 до 32')
        } else if (!regex1.test(password) && password !== '') {
            setErrorPass('Пароль должен содержать хотя бы одно число.')
        } else if (!regex2.test(password) && password !== '') {
            setErrorPass('Пароль должен содержать хотя бы одну букву.')
        } else {
            setErrorPass('')
        }
        if (password !== passwordAgain && passwordAgain !== '') {
            setErrorPassAgain('Пароли не совпадают')
        } else {
            setErrorPassAgain('')
        }
    
    }, [password, passwordAgain]);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown' && document.activeElement === navigateRef1.current) {
            e.preventDefault();
            navigateRef2.current.focus();
        } else if (e.key === 'ArrowUp' && document.activeElement === navigateRef2.current) {
            e.preventDefault();
            navigateRef1.current.focus();
        } else if (e.key === 'ArrowDown' && document.activeElement === navigateRef2.current) {
            e.preventDefault();
            navigateRef3.current.focus();
        } else if (e.key === 'ArrowUp' && document.activeElement === navigateRef3.current) {
            e.preventDefault();
            navigateRef2.current.focus();
        } else if (e.key === 'ArrowDown' && document.activeElement === navigateRef3.current) {
            e.preventDefault();
            navigateRef4.current.focus();
        } else if (e.key === 'ArrowUp' && document.activeElement === navigateRef4.current) {
            e.preventDefault();
            navigateRef3.current.focus();
        } else if (e.key === 'ArrowDown' && document.activeElement === navigateRef4.current) {
            e.preventDefault();
            navigateRef5.current.focus();
        } else if (e.key === 'ArrowUp' && document.activeElement === navigateRef5.current) {
            e.preventDefault();
            navigateRef4.current.focus();
        }
    };

    const handleEye = () => {
        setIsPasswordVisible(that => !that);
    }

    const yourAccount = async (e) => {
        e.preventDefault();
        try {
            setloadThis('Ждите пж')
            if (name === "" || surname === "" || email === '' || password === '' || passwordAgain === '') {
                setApiErrors('Заполните все поля')
                setloadThis('Зарегистрироваться')
                return;
            }
            if (password!== passwordAgain) {
                setApiErrors('Пароли не совпадают')
                setloadThis('Зарегистрироваться')
                return;
            }
            setApiErrors('')
            const res = await registration(email, password, name, surname)
            setloadThis('Зарегистрироваться')
            localStorage.setItem('accessToken', res)
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
                <form onKeyDown={handleKeyDown} onSubmit={yourAccount}>
                    {apiErrors !== "" ? <p className={styles["error"]}>{apiErrors}</p> : ""}
                    <div className={styles["nameAndSurname"]}>
                        <div className={styles["name"]}>
                            <label><FaRegUser/> Имя</label>
                            <input 
                                ref={navigateRef1}
                                type="text" 
                                name="name" 
                                placeholder="Введите имя" 
                                value={name}
                                onChange={e => setName(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className={styles["surname"]}>
                            <label><FaRegUser/> Фамилия</label>
                            <input 
                                ref={navigateRef2}
                                type="text" 
                                name="surname"
                                placeholder="Введите фамилию"
                                value={surname} 
                                onChange={e => setSurname(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <label><MdOutlineMail/>Почта</label>
                    {errorEmail !== "" ? <p className={styles["error"]}>{errorEmail}</p> : ""}
                    <input 
                        ref={navigateRef3}
                        style={errorEmail !== "" ? {borderBottom: "2px solid red"} : {}}
                        type="email" 
                        name="email" 
                        placeholder="Введите почту" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label><MdOutlineLock/>Пароль</label>
                    {errorPass !== "" ? <p className={styles["error"]}>{errorPass}</p> : ""}
                    <div className={styles["password"]}>
                        <input
                            ref={navigateRef4}
                            style={errorPass !== "" ? {borderBottom: "2px solid red", userSelect: "none"} : {}}
                            type={isPasswordVisible ? "text" : "password"} 
                            name="password"
                            placeholder="Введите парль"
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="off"
                        />
                        <div className={styles["passwordEye"]} onClick={handleEye}>{isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline/>}</div>
                    </div>
                    <label><MdOutlineLock/>Подтвердите пароль</label>
                    {errorPassAgain !== "" ? <p className={styles["error"]}>{errorPassAgain}</p> : ""}
                    <input 
                        ref={navigateRef5}
                        style={errorPassAgain !== "" ? {borderBottom: "2px solid red"} : {}}
                        type="password" 
                        name="password" 
                        placeholder="Введите ещё раз пароль" 
                        value={passwordAgain}
                        onChange={e => setPasswordAgain(e.target.value)}
                        autoComplete="off"
                    />
                    <button type="submit" onSubmit={yourAccount}>{loadThis}</button>
                </form>
            </div>
        </div>
    )
}