import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import { updateStoryId } from '../redux/slices/storyIdSlice'
import {useSelector, useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'

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
        setIsClicked(true)
        
    } 
    const handleEnterRoom = async() => {
        setIsClicked(false)
        try {
            // const roomId = nanoid();
            // console.log("roomid is : ", roomId)
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
    
        <div className='flex flex-col justify-center items-center gap-4 mx-auto h-screen bg-pink-50' >
            
                <button 
                onClick={handleCreateRoom}
                className='bg-red-500 text-white font-semibold text-lg p-6 rounded-md hover:bg-red-600 transition-all duration-200' >Create New Room</button>
                {
                    isClicked && <div>
                        <span>Room ID created successfullly: <span className='font-bold text-lg cursor-pointer' onClick={handleEnterRoom} >{socket.id}</span> </span>
                        <input type="text"
                        placeholder='enter username (unique)'
                        onChange={(e) => {setUsername(e.target.value); console.log("username: ", username)}}
                        value={username} />
                        <button 
                        onClick={handleEnterRoom}
                        className='bg-pink-500 text-white font-semibold text-lg p-2 rounded-md hover:bg-pink-600 transition-all duration-200' >Enter room</button>
                    </div>
                }
            
            <button 
            onClick={handleExistingRoom}
            className='bg-blue-500 text-white font-semibold text-lg p-6 rounded-md hover:bg-blue-600  transition-all duration-200' >Enter Existing Room</button>
            {
                existingRoom && <div>
                    <input type="text"
                    placeholder='Room id here'
                    value={room}
                    onChange={(e) => {
                        setRoom(e.target.value)
                        // dispatch(updateStoryId(room))
                    }} />
                    <button type='submit' onClick={handleExistingRoomSubmit} >Enter</button>
                </div>
            }
        </div>
    
  )
}

export default CreateRoom