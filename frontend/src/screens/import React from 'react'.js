import React from 'react'

const FoodScreen = () => {
  return (
    <div className='row gy-2'>
      {filteredProducts &&
        filteredProducts.map((product) => (
          <div key={product._id} className='col-lg-3 col-md-4 col-sm-6 col-12'>
            <div className='card icon-card'>
              <div className='card-body'>
                <div className='card-title text-center'>{product.name}</div>
                <div className='card-text text-center'>
                  <div className='btn-group'>
                    <span
                      className='p-1 rounded-pill shadow-none'
                      style={{ color: '#f46c2d' }}
                    >
                      ${product.price}
                    </span>

                    <select
                      className='btn border-1 border-success btn-sm shadow-none mx-1'
                      name='qty'
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      <option value='0' disabled='disabled'>
                        QTY
                      </option>
                      {[...Array(10).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>

                    <FaMinus
                      className='bg-dark p-2 text-light fs-3 rounded-pill mx-1'
                      style={{ cursor: 'pointer' }}
                      onClick={() => removeFromCurrentHandler(product)}
                    />
                    <FaPlus
                      onClick={() => addToCartHandler(product)}
                      className='bg-dark p-2 text-light fs-3 rounded-pill mx-1'
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default FoodScreen
