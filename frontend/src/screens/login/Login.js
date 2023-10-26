import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import getUser from '../../redux/action/userAction'
import URL from '../../config/api'



function Login() {

  let [form, setForm] = useState({ password: '123456', email: "Usama@gmail.com" })
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const updateForm = (e, key) => {
    let value = e.target.value
    let newValue = value.charAt(0).toUpperCase() + value.slice(1)
    setForm({ ...form, [key]: newValue })
  }

  useEffect(() => {
    const email = form.email
    if (email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const result = regex.test(email);
      // alert(result)
      // console.log(result)
      if (result === false) {
        setEmailError('*Email address is not valid.')
      }
      else {
        setEmailError('')
      }
    }
  }, [form.email])

  useEffect(() => {
    if (form.password) {
      let password = form.password
      // console.log(name.length)
      if (password.length < 6) {
        setPasswordError('*Password must be atleast six characters long.')
      }
      else {
        setPasswordError('')
      }
    }
  }, [form.password])


  const login = async () => {
    if (!form.email) {
      setEmailError('*Email is required')
    }
    if (!form.password) {
      setPasswordError('*Password is required')
    }

    else {
      // console.log(form)
      try {
        const axiosInstance = axios.create({
          withCredentials: true
        })
        const response = await axiosInstance.post(`${URL}/auth/login`, form)
        // console.log(response)
        if (response.data.message === 'loggedin') {
          console.log(response.data.message);
          axios.get(`${URL}/auth/get/${form.email}`)
            .then(res => {
              const user = res.data
              dispatch(getUser(user))
              navigate('/home')
            })
            .catch(err => console.log(err))

        }
      } catch (error) {
        console.log('Error:', error.message);
        if (error.response) {
          setEmailError(error.response.data.message)
        }
      }
    }
  }


  return (
    <div className='log-main'>
      <div className='form'>
        <h1>LOGIN</h1>
        <div className='inputbox'>
          <input type='email'
            autoComplete="new-password"
            onChange={(e) => updateForm(e, 'email')} required />
          <label>Email</label>
        </div>
        <p className='emailError'>{emailError}</p>
        <div className='inputbox'>
          <input type='password'
            autoComplete="new-password"
            onChange={(e) => updateForm(e, 'password')} required />
          <label>Password</label>
        </div>
        <p className='passwordError'>{passwordError}</p>
        <div className='action'>
          <button className='login' onClick={login}>Login</button>
          <div className='switch'>
            <p>Don't have an account? </p>
            <button onClick={() => navigate("/register")} className='register'>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login