import { useRef } from 'react'
import { FaCartPlus, FaCheckCircle, FaPrint, FaTimes } from 'react-icons/fa'
import logo from '../images/burger.svg'
import { useReactToPrint } from 'react-to-print'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderSummaryScreen = ({
  cartItems,
  handleSubmit,
  handleStorageClear,
  userInfo,
  success,
  loading,
  error,
}) => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'The Kings Coffee House',
    pageStyle: `size: 302.36px 188.98px`,
  })

  //   Calculate prices
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  return (
    <>
      <button className='btn btn-light btn-sm rounded-pill float-right'>
        <FaCartPlus style={{ fontSize: 15 }} className='custom-color' />{' '}
        <span className='fs-6' className='custom-color'>
          {cartItems ? cartItems.length : 0}
        </span>
      </button>
      <div className='summary text-light'>
        <span className='fw-bold fs-3'>Order</span>
        <span className='fw-bolder fs-6'> Summary</span>
      </div>
      <hr className='text-light' />
      {success && (
        <Message variant='success'>Order Created Successfully</Message>
      )}
      {loading ? (
        <Loader />
      ) : (
        error && <Message variant='danger'>{error}</Message>
      )}
      {cartItems.length > 0 && (
        <ul className='list-group list-group-flush mx-0 px-0 text-light'>
          <div className='cart-body p-3 print-page' ref={componentRef}>
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
                <span className='fw-bold'>Date:</span> 28-Jan, 20:05:00 <br />
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
                    {cartItems.map((item) => (
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
                          cartItems.reduce(
                            (acc, item) => acc + item.qty * item.price,
                            0
                          )
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <p className='text-center'>
                  <span>{`Ku bixi EVC, *712*611242199*${cartItems.reduce(
                    (acc, item) => acc + item.qty * item.price,
                    0
                  )}#`}</span>
                  <br />
                  <span>Mahadsnaid, soo dhawoow markale</span>
                </p>
              </div>
            </div>
          </div>
        </ul>
      )}

      {cartItems.length > 0 ? (
        <div className='btn-group d-flex'>
          <button
            onClick={(e) => handleSubmit(e)}
            className='btn btn-light btn-sm form-control mx-1 rounded-pill'
          >
            <FaCheckCircle /> Checkout
          </button>

          <button
            onClick={handleStorageClear}
            className='btn btn-dark btn-sm form-control mx-1 rounded-pill'
          >
            <FaTimes /> Clear
          </button>

          <button
            onClick={handlePrint}
            className='btn btn-success btn-sm form-control mx-1 rounded-pill'
          >
            <FaPrint /> Print
          </button>
        </div>
      ) : (
        <div className='text-center text-light mt-5'>
          <span className='spinner-grow '></span> <br />
          <span>There's no pending orders!</span>
        </div>
      )}
    </>
  )
}

export default OrderSummaryScreen
