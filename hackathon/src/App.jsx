import React from 'react'
import BottomNavbar from './components/BottomNavbar'
import  HomePage  from './components/HomePage'
import Friends from './components/Friends'
import Profile from './components/Profile'

const App = () => {
  return (
    <div>
      <Friends/>
      {/* <Profile/> */}
      {/* <HomePage/> */}
      <BottomNavbar/>
    </div>
  )
}

export default App
