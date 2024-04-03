import React from 'react'
import lightbulb from '../assets/lightbulb.mp4'
import '../../../client/src/App.css'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <>
        <div className='flex gap-20 ' >
          <video src={lightbulb} autoPlay muted loop className=' w-[60%] h-screen  object-fill '></video>
          
          <div className='h-screen flex flex-col justify-center items-center gap-6 ' >
              <div className='font-bold  text-7xl text-black font-lobster  storytext transition-all delay-1000 duration-200 animate-jump  ' >
                  Story-Canvas
              </div>
              <div className='text-black font-semibold font-titillium text-center' >
                  Where Imagination meets Collaboration, Stories Unfold...
              </div>
          <Link to={'/rooms'} >
          <button className="animated-button">
    <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
      ></path>
    </svg>
    <span class="text">Let's Begin</span>
    <span class="circle"></span>
    <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
      ></path>
    </svg>
  </button>

  </Link>

          </div>
        </div>
    </>
  )
}

export default Home