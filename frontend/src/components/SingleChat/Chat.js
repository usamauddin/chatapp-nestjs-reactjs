import React, { useEffect, useState, useRef } from 'react'
import { IoPaperPlaneSharp } from "react-icons/io5";
import { FaPaperclip } from "react-icons/fa6";
import ScrollableFeed from 'react-scrollable-feed'
import './chat.css'
import Image from '../image/Image';
import Loader from '../Loader/Loader';
import axios from 'axios'
import io from 'socket.io-client'
import URL from '../../config/api';
import { useSelector } from 'react-redux'
import { postImage } from '../../config/firebase';

let compareSelectedChat;

function Chat({ showChat, id }) {

    const chat = useSelector(state => state.selectedChatReducer.chat)
    // const name = useSelector(state => state.userReducer.name)
    // const [fetchAgain, setFetchAgain] = useState()
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [text, setText] = useState()
    const fileInputRef = useRef(null)

    console.log(messages)
    const socket = io(URL, {
        transports: ["websocket"]
    })

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to the server');
        });

        socket.off('disconnect', () => {
            console.log('disconnected')
        })
    }, [])


    useEffect(() => {
        getMessages()
        compareSelectedChat = chat;
    }, [chat])


    useEffect(() => {
        socket.on('chatToClient', (data) => {
            // console.log(data)
            if (data.chatId === compareSelectedChat?._id) {
                setMessages(prev => [...prev, data])
            }
        });
        return () => {
            socket.removeListener('chatToClient')
            socket.off('chatToClient')
        }
    });



    async function getMessages() {
        if (messages === []) {
            setLoading(true)
        }
        try {
            const res = await axios.get(`${URL}/message/get/${chat._id}`)
            if (res.data) {
                setMessages(res.data)
                socket.emit('joinRoom', chat._id)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    const sendMessage = async () => {
        if (!text) {
            alert('Message is empty')
        }
        else {
            await axios.post(`${URL}/message/post`, { senderId: id, message: text, chatId: chat._id, type: 'text' })
                .then(res => {
                    socket.emit('chatToServer', res.data)
                    setText('')
                })
                .catch(err => console.log(err))
        }

    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    }

    async function selectFile(e) {
        const file = e.target.files[0]
        console.log(file)
        const result = await postImage(file)
        console.log(result)
        await axios.post(`${URL}/message/post`, { senderId: id, message: result, chatId: chat._id, type: 'image' })
            .then(res => {
                socket.emit('chatToServer', res.data)
                setText('')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {
                showChat ?
                    <section className='right-section'>
                        <div className='info'>
                            {chat &&
                                <>
                                    <Image image={chat?.users[0]?.image} style={{ marginLeft: 10, width: '50px', height: '50px', borderRadius: '50%' }} />
                                    <p style={{ fontSize: 18, marginLeft: 10 }}>{chat?.users[0]?.name || null}</p>
                                </>
                            }
                        </div>
                        {
                            loading ?
                                <Loader />
                                :
                                messages.length === 0 ? (
                                    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <p style={{ fontSize: 14, color: '#757575' }}>
                                            Start a chat with {chat?.users[0]?.name}
                                        </p>
                                    </div>
                                ) :
                                    <ScrollableFeed>
                                        {
                                            messages.map((item, index) => (
                                                item.type === 'text' ? (
                                                    <p
                                                        key={index}
                                                        className={item.senderId === id ? 'sender' : 'receiver'}
                                                        style={{ marginBottom: index === messages.length - 1 ? '10px' : 0,}}
                                                    >
                                                        {item.message}
                                                    </p>
                                                ) :
                                                    <img
                                                        src={item.message} 
                                                        style={{
                                                        width: 300,    
                                                        marginTop: 10, 
                                                        borderRadius: 10, 
                                                        marginLeft:  item.senderId === id ? 'auto' : null,
                                                        display: 'block',
                                                        marginBottom: index === messages.length - 1 ? '10px' : 0,
                                                        // marginRight: 'auto'
                                                     }} 
                                                     />
                                            ))
                                        }

                                    </ScrollableFeed>
                        }

                        <div className='send-message'>
                            <input
                                type='text'
                                value={text}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => setText(e.target.value)}
                                placeholder='Send a message' />
                            <div className='icon-box'>
                                <FaPaperclip
                                    size={20}
                                    className='icon'
                                    onClick={() => fileInputRef.current.click()}
                                    // onClick={selectFile}
                                    color='#757575' />
                                <IoPaperPlaneSharp
                                    onClick={sendMessage}
                                    size={25}
                                    color='dodgerBlue'
                                    className='icon'
                                />
                            </div>
                            <input
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={selectFile}
                                type='file' />
                        </div>

                    </section> : null
            }
        </>
    )
}

export default Chat