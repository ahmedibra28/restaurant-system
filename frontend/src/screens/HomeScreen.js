import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProduct } from '../actions/productActions'
import FastFoodScreen from './FastFoodScreen'
import MenuCategoryScreen from './MenuCategoryScreen'
import OrderSummaryScreen from './OrderSummaryScreen'

const HomeScreen = () => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products, error, loading } = productList

  useEffect(() => {
    dispatch(listProduct())
  }, [dispatch])

  const [category, setCategory] = useState('Break Fast')

  const [product, setProduct] = useState([])

  const productFiltered =
    products &&
    products.filter((prod) =>
      prod.name.toLowerCase().includes(search.toLowerCase())
    )

  let productsData = []

  const handleChange = (product) => {
    productsData.push(product)

    // const existItem = productArray.find((x) => x._id === product._id)

    // console.log(existItem)
    // console.log(productArray && productArray)

    console.log(productsData)

    // localStorage.setItem('products')
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='row bg-light  bg-menu'>
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
                handleChange={handleChange}
                category={category}
                setProduct={setProduct}
                products={productFiltered}
              />
            </div>
            <div className='col-md-4 bg-dark py-3 '>
              <OrderSummaryScreen />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default HomeScreen
