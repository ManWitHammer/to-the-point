import cn from 'classnames'
import { useEffect, useState, useRef } from 'react'
import styles from './Profile.module.css'
import { useUserStore } from '../../../store/userStore.js'
import avatarNotFined from "../../assets/avatar-not-fined.png"
import copy from 'copy-to-clipboard';
import Header from "../../components/Header/Header"
import { FiSave } from "react-icons/fi";
import { SiVerizon } from "react-icons/si";
import platform from 'platform';

export default function Profile() {
    const { userName, userSurname, userEmail, userId, userIsActivated, userColor, userAvatar, setAvatar} = useUserStore()
    const [osInfo, setOsInfo] = useState('');
    const [osVersion, setOsVersion] = useState('');
    const [dragging, setDragging] = useState(false)
    const [fileName, setFileName] = useState('Выбрать фото')
    const [saveSvg, setSaveSvg] = useState(false)
    const [fileURL, setFileURL] = useState('');
    const fileInputRef = useRef(null)
    const fileRef = useRef(null)

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
		setDragging(false);
		const file = e.dataTransfer.files[0];
		fileInputRef.current = file;
		setFileName(file.name);
		setFileURL(URL.createObjectURL(file));
	};

	const handleFileInputChange = e => {
		const files = e.target.files;
		if (files.length > 0) {
			const file = files[0];
            if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/webp') {
                setFileName(file.name);
                fileInputRef.current = file;
                setFileURL(URL.createObjectURL(file));
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
        formData.append('avatar', fileInputRef.current);
        if (saveSvg || !fileInputRef.current) {
            return
        }
        else if (!saveSvg) {
            setSaveSvg(true)
            setTimeout(setTimeout(() => {
                setSaveSvg(false)
            }, 2000))
            await setAvatar(formData)
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
      </div>
    )
}