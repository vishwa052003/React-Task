import React from 'react'
import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <div>
       <Link to="https://www.youtube.com/">
        <h1 className='text-center p-3 text-success code'>< button className='code'>@!Welcome To React!@</button></h1>
        </Link>
    </div>
  )
}
