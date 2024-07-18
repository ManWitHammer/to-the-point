import { useEffect, useState, useRef } from 'react'
import styles from './DiscriptionOfTask.module.css'
import { useTasksStore } from '../../../store/tasksStore'

function DiscriptionOfTask() {
    const { choosedTask, changeDescriptionOfTask } = useTasksStore()
    const [value, setValue] = useState("");
    const [taskId, setTaskId] = useState("")
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [value]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={styles["discriptionOfTask"]}>
            { Object.keys(choosedTask).length == 0 ? (
                <>
                    <h1 className={styles["thisManWithoutTask"]}>¯\_(ツ)_/¯</h1>
                    <div className={styles["noTask"]}>Выберите любую задачу, чтобы посмотреть её описание</div>
                </>
            ) : (
                <div className={styles["task"]}>
                    <h1 className={styles["title"]}>{choosedTask.title}</h1>
                    <textarea 
                        ref={textareaRef} 
                        value={choosedTask.id !== taskId ? choosedTask.description : value} 
                        onFocus={() => {
                            setTaskId(choosedTask.id)
                            setValue(choosedTask.description)
                        }}
                        onChange={handleChange}
                        onBlur={() => {
                            if (taskId !== choosedTask.id) {
                                console.log(taskId, choosedTask.id)
                                setValue(choosedTask.description)   
                            }
                            else {

                                changeDescriptionOfTask(value, choosedTask.id)
                            }
                            
                        }}
                        className={styles["description"]}
                    ></textarea>
                </div>
            )}
            
        </div>
    )
}

export default DiscriptionOfTask