import { useState } from 'react'
import styles from './ToDoList.module.css'
import { MdDeleteOutline, MdOutlineSchedule } from "react-icons/md";
import { useTasksStore } from '../../../store/tasksStore'

function ToDoList() {
    const { tasks, setChoosedTask, deleteTaskFromStore, changeTaskFromStore } = useTasksStore()
    const [updateTask, setUpdateTask] = useState("")
    const [updateTaskId, setUpdateTaskId] = useState("")

	const deleteTask = task => {
		deleteTaskFromStore(task)
	}
    const changeTask = async (task, newTask) => {
		changeTaskFromStore(task.title, newTask, task._id)
        setChoosedTask({
            title: newTask,
            description: task.description,
            time: task.time,
            id: task._id
        })
	}

    const clearInput = (task) => {
        setUpdateTask("")
        setUpdateTaskId("")
        setChoosedTask({
            title: task.title,
            description: task.description,
            time: task.time,
            id: task._id
        })
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
                            setChoosedTask({
                                title: task.title,
                                description: task.description,
                                time: task.time,
                                id: task._id
                            })
                        }}
                        onChange={e => {
                            setUpdateTask(e.target.value)
                            setChoosedTask({
                                title: e.target.value,
                                description: task.description,
                                time: task.time,
                                id: task._id
                            })
                        }}
                        onBlur={() => {
                            task.title !== updateTask && updateTask !== '' ? changeTask(task, updateTask) : clearInput(task)
                        }}
                    />
                    <div className={styles["deleteAndtime"]}>
                        <MdOutlineSchedule className={styles["time"]} title={new Date(task.time).toLocaleString()}/>
                        <MdDeleteOutline onClick={() => deleteTask(task)}/>
                    </div>
				</li>
			))}
        </ul>
    )
}

export default ToDoList