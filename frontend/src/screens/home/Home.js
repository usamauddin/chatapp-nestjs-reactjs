import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import getUser from '../../redux/action/userAction'
import './home.css'
import { IoExitOutline } from "react-icons/io5";
import { FaSistrix } from "react-icons/fa6";
import ChatRoom from '../../components/ChatRoom/ChatRoom'
import Image from '../../components/image/Image'
import Chat from '../../components/SingleChat/Chat'
import URL from '../../config/api'
import getSelectedChat from '../../redux/action/selectedChatAction'



export default function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const image = useSelector(state => state.userReducer.user.image)
  const id = useSelector(state => state.userReducer.user._id)
  const name = useSelector(state => state.userReducer.user.name)
  const [showChat, setShowChat] = useState(false)

  // curl "<the server URL>/socket.io/?EIO=4&transport=polling"


  const logout = async () => {
    const axiosInstance = axios.create({
      withCredentials: true
    })
    await axiosInstance.get(`${URL}/auth/logout`)
      .then(res => {
        console.log(res.data)
        if (res.data.message === 'loggedout') {
          dispatch(getUser(''))
          dispatch(getSelectedChat(''))
          alert("ok")
          navigate('/login')
        }
      })
      .catch(err => console.log(err))
  }

  function getData(value) {
    setShowChat(value)
  }




  return (
    <>
      <div className='parent'>
        <div className='child'>
          <section className='left-section'>
            <div className='info-section'>
              <Image image={image} style={{ width: '50px', height: '50px', marginRight: 5, borderRadius: '50%' }} />
              <p style={{ marginRight: 'auto' }}>{name}</p>
              <IoExitOutline size={30} color='#757575' onClick={logout} className='icon' />
            </div>
            <div className='search-box'>
              <input type='text' placeholder='Find your chats..' />
              <FaSistrix size={20} color='#757575' className='icon' />
            </div>
            <ChatRoom getData={getData} />
          </section>
          <Chat
            showChat={showChat}
            id={id}
          />
        </div>
      </div>
    </>
  )
}

// IoPaperPlane
// FaRegPaperPlane font awesome6
