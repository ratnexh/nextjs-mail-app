import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      }),
      {
        loading: 'Sending message...',
        success: 'Message sent successfully.',
        error: 'Failed to send message.',
      }
    );
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
        <Toaster
          position="top-right"
          gutter={8}
          toastOptions={{
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
        <form className={styles.main}>
          <h2>Contact form</h2>
          <div className={styles.inputGroup}>
            <label htmlFor='name'>Name</label>
            <input type='text' onChange={(e) => { setName(e.target.value) }} value={name} id='name' className={styles.inputField} autoComplete='true' />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor='email'>Email</label>
            <input type='email' onChange={(e) => { setEmail(e.target.value) }} value={email} id='email' className={styles.inputField} autoComplete='true' />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor='message'>Message</label>
            <input type='text' onChange={(e) => { setMessage(e.target.value) }} value={message} id='message' className={styles.inputField} autoComplete='true' />
          </div>
          <input type='submit' onClick={(e) => { handleSubmit(e) }} />
        </form>
      </div>
    </>
  )
}
