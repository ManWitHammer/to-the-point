import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './App.module.css'
import { useUserStore } from '../store/userStore.js'
import icon from "./assets/icon-notBack.png"
import Header from "./components/Header/Header"


function App() {
  const { userName, userSurname, userEmail, userId } = useUserStore()
  const checkAuth = useUserStore(state => state.checkAuth)
  const navigate = useNavigate()

	useEffect(() => {
		const verifyAuth = async () => {
      await checkAuth()
		}
		verifyAuth()
	}, [checkAuth])

  return (
    <div className={styles["app"]}>
      <Header />
      <div className={styles["card"]}>
        <div className={styles["toThePointText"]}>
          <h1>LET'S GO TO THE POINT</h1>
          <p>To the point — это мощное и многофункциональное приложение для управления задачами и делами, которое помогает пользователям организовывать своё время и повышать продуктивность.</p>
        </div>
        <div className={styles["toThePointImg"]}>
          <img src={icon} alt="to-the-point" />
        </div>
      </div>
      {userName && userSurname && userEmail && userId ? (
        <button className={styles["signUp"]} onClick={() => navigate("./main")}>Открыть свой To do list</button>
      ) : (
        <button className={styles["signUp"]} onClick={() => navigate("./registration")}>Зарегистрироваться сейчас!</button>
        
      )}
    </div>
  )
}

export default App
