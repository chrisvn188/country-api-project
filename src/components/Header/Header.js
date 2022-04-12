import React from 'react'
import './Header.css'
import { BsMoonFill } from 'react-icons/bs'

export default function Header({ switchTheme, theme }) {
  return (
    <header className='header'>
      <div className='container'>
        <div className='content'>
          <h1 className='visually-hidden'>Country Api App</h1>
          <h2 className='title'>Where in the world?</h2>

          <button className='toggle-mode-btn' onClick={switchTheme}>
            <BsMoonFill />
            <span className='darkmode-text'>
              {theme === 'light' ? 'Dark' : 'Light'} Mode
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
