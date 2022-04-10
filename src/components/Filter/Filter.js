import React from 'react'
import './Filter.css'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

export default function Filter({
  handleFilter,
  handleShowFilter,
  regions,
  showFilter,
}) {
  return (
    <div className='filter'>
      <div className='text-wrapper' onClick={handleShowFilter}>
        <p className='text'>Filter by Region</p>
        <MdOutlineKeyboardArrowDown />
      </div>
      {showFilter && (
        <div className='list-container'>
          <ul className='regions-list'>
            {regions.map(region => (
              <li
                className='region'
                key={region}
                data-region={region}
                onClick={handleFilter}>
                {region}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
