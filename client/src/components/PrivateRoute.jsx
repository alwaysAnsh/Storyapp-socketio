import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const {storyId} = useSelector((state) => state.storyId)
  return (
    <>
        {
            storyId? (<Outlet/>) :(<Navigate to={'/'}/>)
        }
    </>
  )
}

export default PrivateRoute