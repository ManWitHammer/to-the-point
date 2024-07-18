import cn from 'classnames'
import { useEffect, useState, useRef } from 'react'
import styles from './Profile.module.css'
import { useUserStore } from '../../../store/userStore.js'
import { useNavigate } from 'react-router-dom'
import copy from 'copy-to-clipboard';
import Header from "../../components/Header/Header"
import { FiSave } from "react-icons/fi";
import { SiVerizon } from "react-icons/si";
import platform from 'platform';

export default function Profile() {
    const { userName, userSurname, userEmail, userId, userIsActivated, userColor, userAvatar, setAvatar, logout} = useUserStore()
    const [osInfo, setOsInfo] = useState('');
    const [osVersion, setOsVersion] = useState('');
    const [dragging, setDragging] = useState(false)
    const [saveSvg, setSaveSvg] = useState(false)
    const [fileURL, setFileURL] = useState('');
    const [apiErrors, setApiErrors] = useState("")
    const fileInputRef = useRef(null)
    const fileRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "To the point | Твой профиль"
        const os = platform.os.family;
        setOsInfo(os);
        setOsVersion(osVersion)
    }, [])

    const handleClick = (textToCopy) => {
        copy(textToCopy);
        alert('Текст скопирован в буфер обмена');
    }

    const handleDragOver = e => {
		e.preventDefault();
		setDragging(true);
	};

	const handleDragLeave = () => {
		setDragging(false);
	};

	const handleDrop = e => {
		e.preventDefault();
        setApiErrors('')
		setDragging(false);
		const file = e.dataTransfer.files[0];
        if (file.size > 1024 * 1024 * 4) {
            setApiErrors('Максимальный размер файла - 4 МБ');
            return;
        }
        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/webp') {
            fileInputRef.current = file;
            setFileURL(URL.createObjectURL(file));
        } else {
            setApiErrors('Неподдерживаемый формат файла')
        }
	};

	const handleFileInputChange = e => {
		const files = e.target.files
        setApiErrors('');
		if (files.length > 0) {
			const file = files[0];
            if (file.size > 1024 * 1024 * 4) {
                setApiErrors('Максимальный размер файла - 4 МБ');
                return;
            }
            if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/webp') {
                fileInputRef.current = file;
                setFileURL(URL.createObjectURL(file));
            } else {
                setApiErrors('Неподдерживаемый формат файла')
            }
		}
	};

	const handleFileLabelClick = () => {
		if (fileRef.current && !saveSvg) {
			fileRef.current.click();
		}
	};

    const handleSaveImg = async () => {
        const formData = new FormData();
        formData.append('avatar', fileInputRef.current)
        try {
            if (saveSvg || !fileInputRef.current) {
                return
            }
            await setAvatar(formData)
            setSaveSvg(true)
            setTimeout(setTimeout(() => {
                setSaveSvg(false)
            }, 2000))
        } 
        catch (error) {
            if (error.message) {
                setApiErrors(error.message)
            }
            else {
                setApiErrors("Ошибка сервера, попробуйте позже")
            }
        }
    }

    const handleLogout = async () => {
        localStorage.clear()
        const res = await logout()
        if (res) {
            navigate('../')
        }
        else {
            alert('Непредивденная ошибка, повторите попытку позже😱😱😭😭')
        }
    }

	useEffect(() => {
		return () => {
			// Cleanup the object URL to avoid memory leaks
			if (fileURL) {
				URL.revokeObjectURL(fileURL);
			}
		};
	}, [fileURL]);

    return (
        <div className={styles["app"]}>
        <Header/>
        {apiErrors && <h1 className={styles["api-error"]}>{apiErrors}</h1>}
        <div className={styles["card"]}>
            <div className={styles["avatar"]}>
                <img src={fileURL ? fileURL : userAvatar} style={{ backgroundColor: `${userColor}` }} />
                <div 
                    className={styles["saveImg"]} 
                    onClick={handleSaveImg}
                >
                    {!saveSvg ? <FiSave/> : <SiVerizon/>}
                </div>
                <div
                    className={cn(styles['darkAvatar'], {
                        [styles['is-active']]: dragging
                    })}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleFileLabelClick}
                >
                    Выбрать фото
                    <input
                        ref={fileRef}
                        name='avatar'
                        type='file'
                        accept="image/jpeg, image/png, image/jpg, image/gif, image/webp"
                        className={styles['file-input']}
                        onChange={handleFileInputChange}
                    />
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
        <button className={styles["logout"]} onClick={handleLogout} >Выйти</button>
      </div>
    )
}