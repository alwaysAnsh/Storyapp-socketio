import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import {Socket, io} from 'socket.io-client'

const Story = () => {
    const socket = useMemo(()=> io("http://localhost:5000"), [] );
    const {storyId} = useSelector((state) => state.storyId)
    const [istyping, setIsTyping ] = useState(false)
    // const [typingText, setTypingText ] = useState(()=> localStorage.getItem('typingText') || '')
    const [typingText, setTypingText ] = useState('')


      const handleTyping = (e) => {
        const text = e.target.value
        
        setIsTyping(true)
        setTypingText(text)
        socket.emit('usertyping',text)
        // localStorage.setItem('typingText',text)
      }
    

    const handleStopTyping = () => {
      setIsTyping(false)
    }

    useEffect(()=> {
        socket.on("connect", () => {
            console.log("connected", socket.id)
          })
        
        socket.on('welcome', (data) => {
          console.log(data)
        })
        
        // socket.on('eventRoom', (data) => {console.log(data)})

        socket.on('usertyping', (text) => {
          setTypingText(text)
          // localStorage.setItem('typingText',text)
        })
    }, [])

  return (
    <>
        <div className='flex flex-col gap-20' >
          <div className='text-2xl text-pink-500 font-bold' >Story Page</div>
          <div>
            <textarea rows={4} cols={100}
            placeholder='Start creating your story here...'
            value={typingText}
            onChange={handleTyping}
            onBlur={handleStopTyping}
            className='border-2 rounded-sm bg-slate-100 text-orange-600 ' />
          </div>
          <div>{istyping ? <span className='font-semibold' >Somebody is typing...</span> : ""}</div>
          <button className='bg-blue-500 text-white font-bold p-4 rounded-md w-[15%] text-xl hover:bg-blue-600 transition-all duration-200' >Save Changes</button>
          
        </div>
    </>
  )
}

export default Story