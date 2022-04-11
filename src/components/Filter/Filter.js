import React, { useState, useRef, useEffect, useCallback } from 'react'
import './Filter.css'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

export default function Filter({
  handleFilter,
  handleShowFilter,
  regions,
  showFilter,
  filterCategory,
  setShowFilter,
}) {
  const [filterText] = useState('Filter by Region')
  const filterBtnRef = useRef(null)

  const doSomething = useCallback(
    function doSomething(e) {
      if (e.target.closest('.filter-btn') === filterBtnRef.current) {
        handleShowFilter()
      } else {
        setShowFilter(false)
      }
    },
    [handleShowFilter, setShowFilter]
  )

  useEffect(() => {
    window.addEventListener('click', doSomething)

    return () => {
      window.removeEventListener('click', doSomething)
    }
  }, [doSomething])

  return (
    <div className='filter'>
      <button className='filter-btn' ref={filterBtnRef}>
        <span className='filter-text'>
          {filterCategory ? filterCategory : filterText}
        </span>
        <MdOutlineKeyboardArrowDown />
      </button>
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
