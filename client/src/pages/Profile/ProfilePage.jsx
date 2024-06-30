import { useEffect, useState } from 'react'
import styles from './Profile.module.css'
import { useUserStore } from '../../../store/userStore.js'
import avatarNotFined from "../../assets/avatar-not-fined.png"
import copy from 'copy-to-clipboard';
import Header from "../../components/Header/Header"
import platform from 'platform';

export default function Profile() {
    const { userName, userSurname, userEmail, userId, userIsActivated, userColor} = useUserStore()
    const [osInfo, setOsInfo] = useState('');
    const [osVersion, setOsVersion] = useState('');
    const [rickRoll, setRickRoll] = useState(false);

    useEffect(() => {
        document.title = "To the point | Твой профиль"
        const os = platform.os.family;
        const osVers = platform.os.version;
        setOsInfo(os);
        setOsVersion(osVersion)
        console.log(platform.os)
    }, [])

    const handleClick = (textToCopy) => {
        copy(textToCopy);
        alert('Текст скопирован в буфер обмена');
    };
    
    const handleRickRoll = () => {
        setRickRoll(true)
    }

    return (
        <div className={styles["app"]}>
        <Header/>
        <div className={styles["card"]}>
            <div className={styles["avatar"]}>
                <img src={avatarNotFined} style={{ backgroundColor: `${userColor}` }} onClick={handleRickRoll} />
                <div className={styles["darkAvatar"]} onClick={handleRickRoll}>
                    Выбрать фото
                </div>
            </div>
            <div className={styles["yourNameAndSurname"]}>
                <div 
                    className={styles["yourName"]}
                    onClick={() => handleClick(userName)}
                >
                    <p>Ваше имя:</p>
                    <p>{userName}</p>
                </div>
                <div 
                    className={styles["yourSurname"]}
                    onClick={() => handleClick(userSurname)}
                >
                    <p>Ваша фамилия:</p>
                    <p>{userSurname}</p>
                </div>
            </div>
            <div 
                className={styles["yourInfo"]}
                onClick={() => handleClick(userEmail)}
            >
                <p>Ваша электронная почта:</p>
                <p>{userEmail}</p>
            </div>
            <div 
                className={styles["yourInfo"]}
                onClick={() => handleClick(userId)}
            >
                <p>Ваш ID:</p>
                <p>{userId}</p>
            </div>
            <div 
                className={styles["yourInfo"]}
                onClick={() => handleClick(osInfo)}
            >
                <p>Ваша операционная система:</p>
                <p>{osInfo} 😱</p>
            </div>
            {!userIsActivated ? (
              <div className={styles["yourInfo"]}>
                <p>Аккаун не активирован. пожалуйста, зайдите на свою почту, чтобы активировать его</p>
              </div>
            ) : ""}
        </div>
        <div className={styles["rickRoll"]} style={rickRoll ? { display: "block", zIndex: 10 } : { display: "none", zIndex: -1 }}>
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=${rickRoll ? "1" : "0"}`} title="Rick Astley - Never Gonna Give You Up (Official Music Video)" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
    )
}