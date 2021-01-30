import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrders } from '../actions/orderActions'

const ReportScreen = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { orders, error: errorOrders, loading: loadingOrders } = orderList

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch, from, to])

  // All Orders
  const totalFilteredOrders =
    orders &&
    orders.filter((order) => order.createdAt >= from && order.createdAt <= to)
  const totalOrders = totalFilteredOrders && totalFilteredOrders.length
  const totalAmountOrders =
    totalFilteredOrders &&
    totalFilteredOrders
      .reduce((acc, item) => acc + item.totalPrice, 0)
      .toFixed(2)

  const getPriceByCategory = (category, products) => {
    let price = 0

    products.forEach((orders) => {
      orders.orderItems
        .filter((order) => order.category === category)
        .forEach((item) => {
          price += item.price * item.qty
        })
    })

    return price
  }

  const getLengthByCategory = (category, products) => {
    let lengthArray = []

    products.forEach((orders) => {
      orders.orderItems
        .filter((order) => order.category === category)
        .forEach((item) => {
          lengthArray.push(item)
        })
    })

    return lengthArray
  }
  const breakFastLength = getLengthByCategory('Break Fast', totalFilteredOrders)
  const hotDrinksLength = getLengthByCategory('Hot Drinks', totalFilteredOrders)
  const coldDrinksLength = getLengthByCategory(
    'Cold Drinks',
    totalFilteredOrders
  )
  const dinnerDrinksLength = getLengthByCategory('Dinner', totalFilteredOrders)

  const breakFastTotalPrice = getPriceByCategory(
    'Break Fast',
    totalFilteredOrders
  )
  const hotDrinksTotalPrice = getPriceByCategory(
    'Hot Drinks',
    totalFilteredOrders
  )
  const coldDrinksTotalPrice = getPriceByCategory(
    'Cold Drinks',
    totalFilteredOrders
  )
  const dinnerTotalPrice = getPriceByCategory('Dinner', totalFilteredOrders)

  return (
    <>
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant='danger'>{errorOrders}</Message>
      ) : (
        <>
          <div className='row'>
            <div className='mx-auto col-lg-8 col-md-8 col-sm-12 col-12'>
              <div className='row'>
                <div className='col-md-6 col-sm-12 col-12'>
                  <label htmlFor='from'>From</label>
                  <input
                    type='date'
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    name='from'
                    className='form-control'
                  />
                </div>
                <div className='col-md-6 col-sm-12 col-12'>
                  <label htmlFor='to'>To</label>
                  <input
                    type='date'
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    name='to'
                    className='form-control'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mt-3 gy-3 '>
            <div className='col-2'></div>
            <div className='mx-auto col-lg-8 col-md-8 col-sm-12 col-12'>
              <div className='card'>
                <div className='card-header'>Orders</div>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>
                    No. of Orders: {totalOrders}
                  </li>
                  <li className='list-group-item'>
                    No. of Total Price Orders: ${totalAmountOrders}
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-2'></div>

            <div className='col-2'></div>

            <div className='mx-auto col-lg-4 col-md-4 col-sm-12 col-12'>
              <div className='card'>
                <div className='card-header'>Break Fast</div>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>
                    No. of Orders: {breakFastLength.length}
                  </li>
                  <li className='list-group-item'>
                    No. of Total Price Orders: ${breakFastTotalPrice}
                  </li>
                </ul>
              </div>
            </div>

            <div className='mx-auto col-lg-4 col-md-4 col-sm-12 col-12'>
              <div className='card'>
                <div className='card-header'>Dinner</div>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>
                    No. of Orders: {dinnerDrinksLength.length}
                  </li>
                  <li className='list-group-item'>
                    No. of Total Price Orders: ${dinnerTotalPrice}
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-2'></div>

            <div className='col-2'></div>

            <div className='mx-auto col-lg-4 col-md-4 col-sm-12 col-12'>
              <div className='card'>
                <div className='card-header'>Cold Drinks</div>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>
                    No. of Orders: {coldDrinksLength.length}
                  </li>
                  <li className='list-group-item'>
                    No. of Total Price Orders: ${coldDrinksTotalPrice}
                  </li>
                </ul>
              </div>
            </div>

            <div className='mx-auto col-lg-4 col-md-4 col-sm-12 col-12'>
              <div className='card'>
                <div className='card-header'>Hot Drinks</div>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>
                    No. of Orders: {hotDrinksLength.length}
                  </li>
                  <li className='list-group-item'>
                    No. of Total Price Orders: ${hotDrinksTotalPrice}
                  </li>
                </ul>
              </div>
            </div>

            <div className='col-2'></div>
          </div>
        </>
      )}
    </>
  )
}

export default ReportScreen
