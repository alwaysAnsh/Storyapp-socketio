import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import {Socket, io} from 'socket.io-client'
import smoke from '../../src/assets/smoke.mp4'
import '../../src/App.css'

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
        <div className='  -z-10 h-auto w-screen object-cover fixed ' >
        <video src={smoke} autoPlay muted loop ></video>
        </div>
        <p className='font-bold text-center font-titillium mx-auto pt-7 w-[50%] text-3xl bg-gradient-to-r from-amber-100 via-amber-400 to-red-800 bg-clip-text text-transparent'>
    "Open the door to endless possibilities and craft your own narrative tapestry."
</p>        <div className='flex  gap-5 justify-evenly items-center relative h-full mt-20  ' >

          

          <div className='text-8xl text-white font-bold font-lobster ' ><p className='text-sandbrown font-lobster font-bold ' >{storyId}</p> Canvas</div>
          
          <div className='flex flex-col gap-7' >
            <div>
              <textarea rows={10} cols={90}
              placeholder='Start creating your story here...'
              value={typingText}
              onChange={handleTyping}
              onBlur={handleStopTyping}
              className='border-2 rounded-sm bg-cyan-50 p-3 font-bold border-sky-100 font-titillium text-black'
              style={{ resize: 'none' }}  />
            </div>
            {/* <div>{istyping ? <span className='font-semibold' >Somebody is typing...</span> : ""}</div> */}
            <button className='btnsave' >
    Save Changes
</button>
          </div>
          
        </div>
    </>
  )
}

export default Story