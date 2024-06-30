import { useState } from 'react'
import styles from './ToDoList.module.css'
import { MdDeleteOutline, MdOutlineSchedule } from "react-icons/md";
import { useTasksStore } from '../../../store/tasksStore'
import { useUserStore } from '../../../store/userStore'

function ToDoList() {
    const { tasks, deleteTaskFromStore, changeTaskFromStore } = useTasksStore()
    const userIdFromStore = useUserStore(state => state.userId)
    const [updateTask, setUpdateTask] = useState("")
    const [updateTaskId, setUpdateTaskId] = useState("")

	const deleteTask = task => {
		deleteTaskFromStore(task, userIdFromStore)
	}
    const changeTask = async (oldTask, newTask, taskId) => {
		changeTaskFromStore(oldTask, newTask, taskId)
	}

    const clearInput = () => {
        setUpdateTask("")
        setUpdateTaskId("")
    }

    return (
        <ul className={styles["ToDoList"]}>
            {tasks.map((task) => (
				<li key={task._id}>
					<input 
                        id={task._id}
                        name="task" 
                        className={styles["task"]} 
                        value={task._id == updateTaskId ? updateTask : task.title} 
                        onFocus={() => {
                            setUpdateTaskId(task._id)
                            setUpdateTask(task.title)
                        }}
                        onChange={e => setUpdateTask(e.target.value)}
                        onBlur={() => task.title !== updateTask && updateTask !== '' ? changeTask(task.title, updateTask, task._id ) : clearInput()}
                    />
                    <div className={styles["deleteAndtime"]}>
                        <MdOutlineSchedule className={styles["time"]} title={task.time}/>
                        <MdDeleteOutline onClick={() => deleteTask(task)}/>
                    </div>
				</li>
			))}
        </ul>
    )
}

export default ToDoList