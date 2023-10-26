import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './register.css'
import axios from 'axios'
import URL from '../../config/api'


function Register() {

  let [form, setForm] = useState({ name: 'usama', email: 'usama100@gmail.com', password: '1234567' })
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate()


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

  useEffect(() => {
    if (form.name) {
      let name = form.name
      // console.log(name.length)
      if (name.length < 3) {
        setNameError('*Name is too short.')
      }
      // if(!form.name) {
      //     setNameError('')
      // }
      else {
        setNameError('')
      }
    }
  }, [form.name])

  const signup = async () => {
    if (!form.name) {
      setNameError('*Name is required')
    }
    if (!form.email) {
      setEmailError('*Email is required')
    }
    if (!form.password) {
      setPasswordError('*Password is required')
    }
    else {
      console.log(form)
      try {
        const response = await axios.post(`${URL}/auth/register`, form)
        console.log(response)
        if (response.data.message === 'registered') {
          alert(response.data.message)
          navigate('/')
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
    <div className="reg-main">
      <div className="form">
        <h1>Register</h1>
        <p className='name'>{nameError}</p>
        <div className="inputbox">
          <input type="text"
            autoComplete="new-password"
            onChange={(e) => updateForm(e, "name")} required />
          <label>Name</label>
        </div>
        <p className='email'>{emailError}</p>
        <div className="inputbox">
          <input type="email"
            autoComplete="new-password"
            onChange={(e) => updateForm(e, "email")} required />
          <label>Email</label>
        </div>
        <p className='password'>{passwordError}</p>
        <div className="inputbox">
          <input type="password"
            autoComplete="new-password"
            onChange={(e) => updateForm(e, "password")} required />
          <label>Password</label>
        </div>
        <div className="action">
          <button onClick={signup} className="register">
            Register
          </button>
          <div className="switch">
            <p>Already have an account?</p>
            <button
              onClick={() => navigate("/")}
              className="login"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

// "C:/Program Files/Google/Chrome/Application/chrome.exe" --user-data-dir="C:/Chrome dev session" --disable-web-security