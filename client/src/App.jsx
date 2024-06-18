import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { NavLink } from 'react-router-dom'
import axios from "axios"
import styles from './App.module.css'

function App() {
  const [count, setCount] = useState(+localStorage.getItem('count') || 0)
  const [valueGPT, setValueGPT] = useState('')
  const [chatGPT, setChatGPT] = useState('')
  const chatWithGPT = async () => {
    console.log("жди")
    const API_URL = 'https://chatgpt-3-5-to-the-point.onrender.com/v1/chat/completions';
    if (valueGPT === '') {
      alert('Введите текст для общения с GPT-3.5')
      return;
    }

    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Hello!"
        }
      ],
      stream: true
      };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios
      .post(API_URL, data, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className={styles["app"]}>
      <div className={styles["fixedBlock"]}></div>
      <div className={styles["card"]}>
        <button 
          className={styles["card-btn"]}
          onClick={() => {
            if (localStorage.getItem('accessToken') !== null) {
              setCount((count) => count + 2)
              localStorage.setItem('count', count)
            }
            else {
              alert("Эй, ты не авторизовался на нашу страничку🙄")
            }
          }}
        >count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <input
          name="chat"
          placeholder="Введите сообщение"
          value={valueGPT} 
          onChange={e => setValueGPT(e.target.value)}
        />

        <button
          onClick={chatWithGPT}
        >Нажми на меня</button>
        <NavLink
          to='./login'
          id='link'>
          Авторизоваться
        </NavLink>
      </div>
    </div>
  )
}

export default App
