import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../../store/userStore.js'
import styles from './Header.module.css'

let previousLocation = null;

function Header() {
    const location = useLocation();
    const navigate = useNavigate()
    const { userName, userSurname, userEmail, userId, userColor, userAvatar } = useUserStore()

    useEffect(() => {
        previousLocation = location;
    }, [location]);

    return (
        <>
            <div className={styles["fixedBlock"]}>
                <p className={styles["pathName"]}>{location.pathname == "/profile" ? "Профиль" 
                    : location.pathname == "/main" ? "To Do List"
                    : "Главная" 
                }</p>
                {userName && userSurname && userEmail && userId ? (
                <div className={styles["account"]}>
                    <p>{userName} {userSurname}</p>
                    <div className={styles["strength"]}></div>
                    <div className={styles["avatar"]} >
                    <img 
                        style={{ backgroundColor: `${userColor}` }}
                        src={userAvatar} 
                        alt="avatar" 
                        onClick={() => {
                        if (userEmail !== "") {
                            if (previousLocation.pathname == "/") {
                                navigate("./profile")
                            }
                            else if (previousLocation.pathname == "/profile") {
                                navigate("../")
                            }
                            else {
                                navigate("../profile")
                            }
                        }
                        else {
                            alert("Эй, ты не авторизовался на нашу страничку🙄")
                        }
                        }}
                    />
                    </div>
                </div>
                ) : (
                <div className={styles["toAuth"]} onClick={() => navigate("./login")}>Войти</div>
                )}
            </div>
            <div className={styles["highStrength"]}></div>
        </>
    )
}

export default Header