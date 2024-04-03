import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import { updateStoryId } from '../redux/slices/storyIdSlice'
import {useSelector, useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'
import blackcup from '../assets/blackcup.mp4'
import '../../src/App.css'

const CreateRoom = () => {

    const {storyId} = useSelector((state) => state.storyId)
    const [isClicked, setIsClicked ] = useState(false)
    const [existingRoom, setIsExistingRoom ] = useState(false)
    const [room, setRoom ] = useState('')
    const [username, setUsername ] = useState('')
    console.log('storyid is: ',storyId)
    const socket = useMemo(()=>io("http://localhost:5000"),[])
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        
        // When storyId changes, send it to the server to create a room
        if (storyId) {
          socket.emit('createRoom', storyId);
          console.log("room created succs: ", storyId)
        }
      }, [storyId]);

    const handleCreateRoom = () => {
        
        // dispatch(updateStoryId(socket.id))
        setIsExistingRoom(false)
        setIsClicked(true)
        
    } 
    const handleEnterRoom = async() => {
        setIsExistingRoom(false)
        setIsClicked(false)
        try {
            
            const res = await fetch('/api/room/create', {
                method: 'POST',
                headers:{
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({username})
              })
            //   console.log("res.roomId from response is: ", res.roomId)
              const response = await res.json();
              console.log("response is: ", response)

              if(!response.success){
                console.log("response is false", response.message)

              }
            //   console.log("response is: ", response)
              dispatch(updateStoryId(response.user.username))
            navigate(`/story/${response.user.username}`)
        } catch (error) {
            console.log("inside catch block of client side: ", error)
        }
    }

    const handleExistingRoom = ()=> {
        setIsClicked(false)
        setIsExistingRoom(true)
    }

    const handleExistingRoomSubmit = (e)=>{
        e.preventDefault();
        setIsExistingRoom(false);
        if(room){
            navigate(`/story/${room}`)
        }
        else{
            navigate('/rooms')
        }
    }

  return (
    
        <div className='md:flex  md:justify-around md:items-center gap-4 mx-auto h-screen  ' >
            <video src={blackcup} autoPlay muted loop className='absolute -z-10 h-full w-screen object-fill '></video>
                <button 
                onClick={handleCreateRoom}
                className='btn' >Create New Room</button>
                {
                    isClicked && <div className='flex flex-col gap-6' >
                        {/* <span className='text-white' >Room ID created successfullly: <span className='font-bold text-white text-lg cursor-pointer' onClick={handleEnterRoom} >{socket.id}</span> </span> */}
                     
                        <input type="text"
                        placeholder='Room Name (unique)'
                        onChange={(e) => {setUsername(e.target.value); console.log("username: ", username)}}
                        value={username}
                        className='rounded-md p-3 text-blue-700 font-semibold border-none' />
                        <button className='Enterbtn' onClick={handleEnterRoom} >
                            <div class="svg-wrapper-1">
                                <div class="svg-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                                </svg>
                                </div>
                            </div>
                            <span>Enter room</span>
                        </button>
                    </div>
                }
            
            <button 
            onClick={handleExistingRoom}
            className='btn' >Enter Existing Room</button>
            {
                existingRoom && <div className='flex  gap-6' >
                    <input type="text"
                    placeholder='Room id here'
                    value={room}
                    onChange={(e) => {
                        setRoom(e.target.value)
                        // dispatch(updateStoryId(room))
                    }}
                    className='rounded-md  p-2 text-blue-700 font-semibold border-none' />
                    <button className='existingRoombtn' onClick={handleExistingRoomSubmit} >
                        <span>Enter</span>
                    </button>
                </div>
            }
        </div>
    
  )
}

export default CreateRoom