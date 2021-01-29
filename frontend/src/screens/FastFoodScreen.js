import { FaMinus, FaPlus } from 'react-icons/fa'
import hotDrink from '../images/hotDrink.svg'
import coldDrink from '../images/coldDrink.svg'
import breakFast from '../images/breakFast.svg'
import dinner from '../images/dinner.svg'

const FastFoodScreen = ({
  products,
  category,
  addToCartHandler,
  removeFromCurrentHandler,
  cartItems,
}) => {
  const filteredProducts =
    products && products.filter((product) => product.category === category)

  return (
    <div className='row gy-2'>
      {filteredProducts &&
        filteredProducts.map((product, index) => (
          <div key={product._id} className='col-lg-3 col-md-4 col-sm-6 col-12'>
            <div className='card icon-card'>
              <img
                src={
                  product.image
                    ? product.image
                    : product.category === 'Break Fast'
                    ? breakFast
                    : product.category === 'Dinner'
                    ? dinner
                    : product.category === 'Hot Drinks'
                    ? hotDrink
                    : product.category === 'Cold Drinks' && coldDrink
                }
                alt={product.product}
                className='img-fluid w-50 mx-auto pt-1'
              />
              <div className='card-body'>
                <div className='card-title text-center'>{product.name}</div>
                <div className='card-text text-center'>
                  <div className='btn-group'>
                    <span className='p-1  rounded-pill shadow-none custom-color'>
                      ${product.price}
                    </span>

                    {cartItems &&
                      cartItems.map(
                        (item) =>
                          item.product === product._id && (
                            <FaMinus
                              key={item.product}
                              className='bg-dark p-2 text-light fs-3 rounded-pill mx-1'
                              style={{ cursor: 'pointer' }}
                              onClick={() => removeFromCurrentHandler(product)}
                            />
                          )
                      )}

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

export default FastFoodScreen
