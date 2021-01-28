import { useRef } from 'react'
import {
  FaCartArrowDown,
  FaCartPlus,
  FaCheckCircle,
  FaPrint,
} from 'react-icons/fa'
import logo from '../images/burger.svg'
import { useReactToPrint } from 'react-to-print'

const OrderSummaryScreen = () => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Burger Brand',
  })

  return (
    <>
      <button className='btn btn-light btn-sm rounded-pill float-right'>
        <FaCartPlus style={{ color: '#f46c2d', fontSize: 15 }} />{' '}
        <span className='fs-6' style={{ color: '#f46c2d' }}>
          4
        </span>
      </button>
      <div className='summary text-light'>
        <span className='fw-bold fs-3'>Order</span>
        <span className='fw-bolder fs-6'> Summary</span>
      </div>
      <hr className='text-light' />

      <ul className='list-group list-group-flush mx-0 px-0 text-light'>
        <div className='cart-body p-3' ref={componentRef}>
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
                  style={{ letterSpacing: '5px' }}
                >
                  BRAND
                </span>
                <br />
                <span>KM4, Mogadishu - Somalia</span> <br />
                <span>EVC - 615 30 15 07</span>
              </p>
            </div>
            <p className='text-center '>
              <span className='fw-bold'>Invoice#:</span> 8888cc6 <br />
              <span className='fw-bold'>Date:</span> 28-Jan, 20:05:00 <br />
              <span className='fw-bold'>Cashier:</span> John Doe
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
                  <tr>
                    <td>Ice Tea</td>
                    <td>1</td>
                    <td>$2.5</td>
                    <td>$2.5</td>
                  </tr>
                  <tr>
                    <td>Burger</td>
                    <td>2</td>
                    <td>$3</td>
                    <td>$6</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan='2'></td>
                    <td className='fw-bold'>Total:</td>
                    <td>$8.5</td>
                  </tr>
                </tfoot>
              </table>
              <p className='text-center'>
                <span>Ku bixi EVC, *789*808080*8.5#</span> <br />
                <span>Mahadsnaid, soo dhawoow markale</span>
              </p>
            </div>
          </div>
        </div>
      </ul>

      <div className='btn-group d-flex'>
        <button
          className='btn btn-light btn-sm form-control mx-1 rounded-pill'
          disabled
        >
          <FaCheckCircle /> Checkout
        </button>
        <button
          onClick={handlePrint}
          className='btn btn-success btn-sm form-control mx-1 rounded-pill'
        >
          <FaPrint /> Print
        </button>
      </div>
    </>
  )
}

export default OrderSummaryScreen
