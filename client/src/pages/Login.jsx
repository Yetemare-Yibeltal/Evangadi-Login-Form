import { useRef,React } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
const Login = () => {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

async function handleSubmit (e) {
  e.preventDefault()

  // Reset all inputs to normal before validation
  emailDom.current.classList.remove('invalid')
  passwordDom.current.classList.remove('invalid')


  const emailValue = emailDom.current.value.trim()
  const passwordValue = passwordDom.current.value.trim()

  let hasError = false

  if (!emailValue) {
    emailDom.current.classList.add('invalid')
    hasError = true
  }
  if (!passwordValue || passwordValue) {
    passwordDom.current.classList.add('invalid')
    hasError = true
  }
  
  try {
   const {data} =  await axios.post('/users/login', {
      email: emailValue,
      password: passwordValue
    })
    alert('Login successful!');
// store tokens from the localstorage;
localStorage.setItem('token',data)

    navigate('/')
    console.log(data)
  } catch (error) {
    
    alert(error?.response?.data?.msg)
    console.log(error.response.data)

  }
}


  return (
 <section>
;<form onSubmit={handleSubmit}>
  <div>
    <span>Email</span>
    <input type='email' ref={emailDom} placeholder='email' />
  </div>
  <div>
    <span>Password</span>
    <input type='password' ref={passwordDom} placeholder='password' />
  </div>
  <button type='submit'>Login</button>
</form>

 </section>
  )
}

export default Login
