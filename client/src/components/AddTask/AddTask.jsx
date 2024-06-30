import { useEffect, useState } from 'react'
import styles from './AddTask.module.css'
import { useTasksStore } from '../../../store/tasksStore'

function AddTask() {
    const { addTaskToStore } = useTasksStore()
	const [task, setTask] = useState('')

	const addTask = () => {
		addTaskToStore({
            title: task,
            description: 'Это не описание',
            time: new Date().toLocaleString()
        })
		setTask('')
	}
    const handleKeyUp = (event) => {
        if (event.key === 'Enter' && task!== '') {
            addTask()
        }
    }
    
    return (
        <>
            <h1 className={styles["whatIsDay"]}>Сегодня</h1>
            <div className={styles["AddTask"]}>
                <input 
                    type="text" 
                    value={task}
                    placeholder="+ Добавить задачу" 
                    onChange={e => setTask(e.target.value)}
                    onKeyUp={e => handleKeyUp(e)}
                    className={styles["inputTask"]} 
                />
            </div>
        </>
    )
}

export default AddTask