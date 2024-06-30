import Header from "../../components/Header/Header"
import Categories from "../../components/Categories/Categories"
import AddTask from "../../components/AddTask/AddTask"
import DiscriptionOfTask from "../../components/DiscriptionOfTask/DiscriptuonOfTask"
import ToDoList from "../../components/ToDoList/ToDoList"
import styles from "./Main.module.css"

function Main() {
    return (
        <div className={styles["app"]}>
            <Header />
            <div className={styles["card"]}>
                <div className={styles["list"]}>
                    <AddTask />
                    <ToDoList/>
                </div>
                <DiscriptionOfTask/>
            </div>
        </div>
    )
}

export default Main