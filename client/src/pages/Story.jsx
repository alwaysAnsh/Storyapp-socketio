import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import {Socket, io} from 'socket.io-client'
import smoke from '../../src/assets/smoke.mp4'

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
        <video src={smoke} autoPlay muted loop className=' absolute -z-10 h-auto w-screen object-cover '></video>

        <div className='flex  gap-5 justify-evenly items-center relative h-screen  ' >

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
            <button className='bg-blue-500 text-white font-bold p-4 rounded-md w-[15%] text-xl hover:bg-blue-600 transition-all duration-200' >Save Changes</button>
          </div>
          
        </div>
    </>
  )
}

export default Story