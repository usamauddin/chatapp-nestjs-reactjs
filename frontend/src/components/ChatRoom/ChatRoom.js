import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import './chatroom.css'
import Image from '../image/Image'
import Loader from '../Loader/Loader'
import URL from '../../config/api'
import getSelectedChat from '../../redux/action/selectedChatAction'
// import io, { Socket } from 'socket.io-client'


function ChatRoom({ getData }) {

    const dispatch = useDispatch()
    const id = useSelector(state => state.userReducer.user._id)
    const [allChatRoom, setAllChatRoom] = useState([])
    const [loading, setLoading] = useState(false)
    const [chatIndex, setChatIndex] = useState(null)

    // const socket = io(URL)
    // console.log(allChatRoom)
    useEffect(() => {
        setLoading(true)
        axios.get(`${URL}/privatechat/get/${id}`)
            .then(res => {
                const data = res.data
                // console.log(res.data)
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].users.length; j++) {
                        if (data[i].users[j]._id === id) {
                            data[i].users.splice(j, 1)
                            setAllChatRoom(data)
                            setLoading(false)
                        }
                    }
                }
            })
            .catch(err => console.log(err))
    }, [])


    setTimeout(() => {
        setLoading(false)
    }, 10000)
    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    allChatRoom.length === 0 ? (
                        <p style={{ fontSize: 14, marginTop: 10, color: '#757575' }}>No chats found</p>
                    ) : (
                        <div className="room">
                            {allChatRoom.map((item, index) => (
                                <div
                                    className="chat"
                                    key={item._id}
                                    style={{ backgroundColor: chatIndex === index ? 'rgba(0, 0, 0, 0.04)' : 'white' }}
                                    onClick={() => {
                                        setChatIndex(index);
                                        getData(true);
                                        dispatch(getSelectedChat(item));
                                    }}>
                                    <Image image={item.users[0].image} style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
                                    <div className="message-box">
                                        <p className="user">{item.users[0].name}</p>
                                        {
                                            item.type == 'text' ? 
                                            <p className="message">{item.lastMessage}</p>
                                            : 
                                            <p className='message'>Photo</p>
                                        }
                                        {/* {item.users[0]._id === id ? 'You' : item.users[0].name+':'}  */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )
            }
        </>
    )
}


export default ChatRoom