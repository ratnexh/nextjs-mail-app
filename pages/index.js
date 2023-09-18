import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = {
      name,
      email,
      message
    }
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        console.log('Response succeeded!')
        setName('')
        setEmail('')
        setMessage('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.main}>
          <div className={styles.inputGroup}>
            <label htmlFor='name'>Name</label>
            <input type='text' onChange={(e) => { setName(e.target.value) }} value={name} name='name' className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor='email'>Email</label>
            <input type='email' onChange={(e) => { setEmail(e.target.value) }} value={email} name='email' className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor='message'>Message</label>
            <input type='text' onChange={(e) => { setMessage(e.target.value) }} value={message} name='message' className={styles.inputField} />
          </div>
          <input type='submit' onClick={(e) => { handleSubmit(e) }} />
        </form>
      </div>
    </>
  )
}
