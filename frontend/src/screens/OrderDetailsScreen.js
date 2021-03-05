import React from 'react'
import logo from '../images/burger.svg'

const OrderDetailsScreen = ({
  orderDetails,
  addDecimal,
  moment,
  Moment,
  userInfo,
}) => {
  const evcFormat = () => {
    const evcPrice = orderDetails.orderItems.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    )
    if (evcPrice < 1) {
      const removedPoint = evcPrice.toString().replace(/[.]/g, '')
      return `Ku bixi EVC, *712*611242199*${removedPoint}#`
    }
    if (evcPrice % 1 === 0) {
      return `Ku bixi EVC, *712*611242199*${evcPrice}#`
    }
    if (evcPrice % 1 !== 0) {
      const removedPointGtOne = evcPrice.toString().split('.')
      return `Ku bixi EVC, *712*611242199*${removedPointGtOne[0]}*${removedPointGtOne[1]}#`
    }
  }

  return (
    <ul className='list-group list-group-flush mx-0 px-0 text-primary'>
      <div className='cart-body p-3 print-page'>
        <div className='cart-text'>
          <div className='brand text-center '>
            <img
              src={logo}
              alt='logo'
              className='img-fluid'
              style={{ width: '35px' }}
            />
            <p>
              <span
                className='fw-bold text-center'
                style={{ letterSpacing: '3px' }}
              >
                THE KINGS COFFEE HOUSE
              </span>
              <br />
              <span>Makkah Almukarramah Ave</span> <br />
              <span>EVC - 611 24 21 99</span>
            </p>
          </div>
          <p className='text-center '>
            <span className='fw-bold'>Invoice#:</span> {Date.now()} <br />
            <span className='fw-bold'>Date:</span>{' '}
            <Moment format='YYYY-MM-DD HH:mm:ss'>
              {moment(orderDetails.createdAt)}
            </Moment>{' '}
            <br />
            <span className='fw-bold'>Cashier:</span>{' '}
            {userInfo && userInfo.name}
          </p>

          <div className='table-responsive ' style={{ fontSize: '0.7rem' }}>
            <table className='table table-sm hover borderless striped text-primary'>
              <thead>
                <tr>
                  <th style={{ fontSize: '0.7rem' }}>ITEM</th>
                  <th style={{ fontSize: '0.7rem' }}>QTY</th>
                  <th style={{ fontSize: '0.7rem' }}>PRICE</th>
                  <th style={{ fontSize: '0.7rem' }}>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.product}>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>${addDecimal(item.price)}</td>
                    <td>${addDecimal(item.price * item.qty)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan='2'></td>
                  <td className='fw-bold'>Total:</td>
                  <td>
                    $
                    {addDecimal(
                      orderDetails.orderItems.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      )
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
            <p className='text-center'>
              <span>{evcFormat()}</span>
              <br />
              <span>Mahadsnaid, soo dhawoow markale</span>
            </p>
          </div>
        </div>
      </div>
    </ul>
  )
}

export default OrderDetailsScreen
