import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  removeFromCart,
  removeAllFromCart,
} from '../actions/productActions'
import { createOrder } from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProduct } from '../actions/productActions'
import FastFoodScreen from './FastFoodScreen'
import MenuCategoryScreen from './MenuCategoryScreen'
import OrderSummaryScreen from './OrderSummaryScreen'

const HomeScreen = () => {
  const [search, setSearch] = useState('')
  const [qty, setQty] = useState(0)
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products, error, loading } = productList

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listProduct())
  }, [dispatch])

  const [category, setCategory] = useState('Break Fast')

  const productFiltered =
    products &&
    products.filter((prod) =>
      prod.name.toLowerCase().includes(search.toLowerCase())
    )

  const addToCartHandler = (product) => {
    dispatch(addToCart(product))
  }

  const removeFromCurrentHandler = (product) => {
    dispatch(removeFromCart(product))
  }

  const handleStorageClear = () => {
    dispatch(removeAllFromCart())
  }

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createOrder({
        totalPrice,
        orderItems: cartItems,
      })
    )
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='row bg-light bg-menu'>
            <div className='col-md-8 p-3'>
              <div className='row'>
                <div className='col-4'>
                  <span className='fw-bold fs-3' style={{ color: '#f46c2d' }}>
                    Menu
                  </span>
                  <span className='fw-bolder fs-6'> Category</span>
                </div>
                <div className='col-8'>
                  <input
                    type='text'
                    className='form-control shadow-none rounded-pill'
                    placeholder='Search by food or drink'
                    name='search'
                    min='0'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <MenuCategoryScreen
                category={category}
                setCategory={setCategory}
              />
              <hr />
              <FastFoodScreen
                addToCartHandler={addToCartHandler}
                removeFromCurrentHandler={removeFromCurrentHandler}
                category={category}
                products={productFiltered}
                qty={qty}
                setQty={setQty}
                cartItems={cartItems}
              />
            </div>
            <div className='col-md-4 bg-dark py-3 '>
              <OrderSummaryScreen
                cartItems={cartItems && cartItems}
                handleSubmit={handleSubmit}
                handleStorageClear={handleStorageClear}
                userInfo={userInfo}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default HomeScreen
