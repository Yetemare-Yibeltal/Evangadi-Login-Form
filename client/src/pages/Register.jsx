import React from 'react'
import './Register.css'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axiosConfig'
const Register = () => {
  // navigation module;
  const navigate = useNavigate()

  const userNameDom = useRef()
  const firstNameDom = useRef()
  const lastNameDom = useRef()
  const emailDom = useRef()
  const passwordDom = useRef()

 async function handleSubmit (e) {
  e.preventDefault()

  // Reset all inputs to normal before validation
  userNameDom.current.classList.remove('invalid')
  firstNameDom.current.classList.remove('invalid')
  lastNameDom.current.classList.remove('invalid')
  emailDom.current.classList.remove('invalid')
  passwordDom.current.classList.remove('invalid')

  const usernameValue = userNameDom.current.value.trim()
  const firstnameValue = firstNameDom.current.value.trim()
  const lastnameValue = lastNameDom.current.value.trim()
  const emailValue = emailDom.current.value.trim()
  const passwordValue = passwordDom.current.value.trim()

  let hasError = false

  if (!usernameValue) {
    userNameDom.current.classList.add('invalid')
    hasError = true
  }
  if (!firstnameValue) {
    firstNameDom.current.classList.add('invalid')
    hasError = true
  }
  if (!lastnameValue) {
    lastNameDom.current.classList.add('invalid')
    hasError = true
  }
  if (!emailValue) {
    emailDom.current.classList.add('invalid')
    hasError = true
  }
  if (!passwordValue) {
    passwordDom.current.classList.add('invalid')
    hasError = true
  }
if(passwordValue.length <= 8){
  alert('password must be at least 9 character')
}
  if (hasError) {
    alert('Please provide all required information!')
    return
  }

  try {
    await axios.post('/users/register', {
      username: usernameValue,
      firstname: firstnameValue,
      lastname: lastnameValue,
      email: emailValue,
      password: passwordValue
    })
    alert('Register successful, please login!')
    navigate('/login')
   
  } catch (error) {
    alert('Something went wrong!')
    console.log(error)

  }
}

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>username</span>
          <input type='text' ref={userNameDom} placeholder='username' />
        </div>
        <div>
          <span> First name</span>
          <input type='text' ref={firstNameDom} placeholder='firstname' />
        </div>
        <div>
          <span>Last name</span>
          <input type='text' ref={lastNameDom} placeholder='lastname' />
        </div>
        <div>
          <span>Email</span>
          <input type='email' ref={emailDom} placeholder='email' />
        </div>
        <div>
          <span>Password</span>
          <input type='password' ref={passwordDom} placeholder='password' />
        </div>
        <button type='submit'>Register</button>
      </form>
    </section>
  )
}

export default Register
