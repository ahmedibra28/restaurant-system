import React from 'react'
import coldDrink from '../images/coldDrink.svg'
import hotDrink from '../images/hotDrink.svg'
import dinner from '../images/dinner.svg'
import breakFast from '../images/breakFast.svg'

const MenuCategoryScreen = ({ category, setCategory }) => {
  return (
    <div className='row mt-4 mx-auto text-center'>
      <div className='col-3 '>
        <div
          onClick={() => setCategory('Break Fast')}
          className={`py-2 icon-card ${
            category === 'Break Fast' && 'focus-box'
          }`}
        >
          <img
            src={breakFast}
            alt='Break Fast'
            className='img-fluid img-top w-25 mx-auto '
          />

          <span
            className={`fw-bold ${category === 'Break Fast' && 'focus-color'}`}
          >
            {' '}
            Break Fast
          </span>
        </div>
      </div>

      <div className='col-3 '>
        <div
          onClick={() => setCategory('Dinner')}
          className={`py-2 icon-card ${category === 'Dinner' && 'focus-box'}`}
        >
          <img
            src={dinner}
            alt='Dinner'
            className='img-fluid img-top w-25 mx-auto'
          />
          <span className={`fw-bold ${category === 'Dinner' && 'focus-color'}`}>
            {' '}
            Dinner
          </span>
        </div>
      </div>

      <div className='col-3 '>
        <div
          onClick={() => setCategory('Cold Drinks')}
          className={`py-2 icon-card ${
            category === 'Cold Drinks' && 'focus-box'
          }`}
        >
          <img
            src={coldDrink}
            alt='Cold Drinks'
            className='img-fluid img-top w-25 mx-auto'
          />
          <span
            className={`fw-bold ${category === 'Cold Drinks' && 'focus-color'}`}
          >
            {' '}
            Cold Drinks
          </span>
        </div>
      </div>

      <div className='col-3 '>
        <div
          onClick={() => setCategory('Hot Drinks')}
          className={`py-2 icon-card ${
            category === 'Hot Drinks' && 'focus-box'
          }`}
        >
          <img
            src={hotDrink}
            alt='Hot Drinks'
            className='img-fluid img-top w-25 mx-auto'
          />
          <span
            className={`fw-bold ${category === 'Hot Drinks' && 'focus-color'}`}
          >
            {' '}
            Hot Drinks
          </span>
        </div>
      </div>
    </div>
  )
}

export default MenuCategoryScreen
