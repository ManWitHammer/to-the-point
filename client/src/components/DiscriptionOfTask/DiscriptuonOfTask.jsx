import { useEffect, useState } from 'react'
import styles from './DiscriptionOfTask.module.css'

function DiscriptionOfTask() {
    return (
        <div className={styles["discriptionOfTask"]}>
            <h1 className={styles["thisManWithoutTask"]}>¯\_(ツ)_/¯</h1>
            <div className={styles["noTask"]}>Выберите любую задачу, чтобы посмотреть её описание</div>
        </div>
    )
}

export default DiscriptionOfTask