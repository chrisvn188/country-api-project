import React from 'react'
import './Header.css'
import { BsMoon, BsMoonFill } from 'react-icons/bs'

export default function Header() {
  return (
    <header className='header'>
      <div className='container'>
        <div className='content'>
          <h1 className='visually-hidden'>Country Api App</h1>
          <h2 className='title'>Where in the world?</h2>
          <label>
            <div className='darkmode-text-wrapper'>
              {true ? <BsMoonFill /> : <BsMoon />} {/* NEED FIXED */}
              <span className='darkmode-text'>Dark Mode</span>
            </div>
            <input type='checkbox' className='visually-hidden' />
          </label>
        </div>
      </div>
    </header>
  )
}
