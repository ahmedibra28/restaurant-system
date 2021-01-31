import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrders, deleteOrder } from '../actions/orderActions'
import { FaInfo, FaSearch, FaTrash } from 'react-icons/fa'
import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'
import Pagination from '../components/Pagination'
import Moment from 'react-moment'
import moment from 'moment'
import OrderDetailsScreen from './OrderDetailsScreen'

const OrderScreen = () => {
  const [search, setSearch] = useState('')
  const [orderDetails, setOrderDetails] = useState({})

  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { orders, error, loading } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDelete = useSelector((state) => state.orderDelete)
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = orderDelete

  //   Calculate prices
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch, successDelete])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch(deleteOrder(id))))
  }

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const filterOrder = orders && orders.filter((ord) => ord._id.includes(search))

  const currentItems =
    filterOrder && filterOrder.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = orders && Math.ceil(orders.length / itemsPerPage)

  return (
    <>
      {successDelete && (
        <Message variant='success'>Order Deleted Successfully</Message>
      )}
      {loadingDelete ? (
        <Loader />
      ) : (
        errorDelete && <Message variant='danger'>{errorDelete}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div>
            <h6 className='fw-light-fs-3'>Orders</h6>

            <div className='input-group mb-3'>
              <input
                type='text'
                className='form-control'
                placeholder='Search by order ID'
                name='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-describedby='basic-addon2'
              />
              <span className='input-group-text' id='basic-addon2'>
                <FaSearch />
              </span>
            </div>

            <div className='table-responsive'>
              <table className='table table-sm hover bordered striped'>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>TOTAL PRICE</th>
                    <th>DATE & TIME</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems &&
                    currentItems.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>${addDecimal(order.totalPrice)}</td>
                        <td>
                          <Moment format='YYYY-MM-DD HH:mm:ss'>
                            {moment(order.createdAt)}
                          </Moment>
                        </td>

                        <td>
                          <button
                            type='button'
                            data-bs-toggle='modal'
                            data-bs-target='#orderView'
                            className='btn btn-info btn-sm'
                            onClick={() => setOrderDetails(order)}
                          >
                            <FaInfo />
                          </button>
                          <button
                            type='button'
                            onClick={() => deleteHandler(order._id)}
                            className='btn btn-danger btn-sm'
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            className='modal fade'
            id='orderView'
            data-bs-backdrop='static'
            data-bs-keyboard='false'
            tabIndex='-1'
            aria-labelledby='orderViewLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog modal-dialog-scrollable'>
              <div className='modal-content modal-background'>
                <div className='modal-header'>
                  <h6 className='modal-title fw-light' id='orderViewLabel'>
                    Order ID: {orderDetails && orderDetails._id}
                  </h6>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                {orderDetails && orderDetails._id && (
                  <div className='modal-body'>
                    <OrderDetailsScreen
                      orderDetails={orderDetails}
                      addDecimal={addDecimal}
                      moment={moment}
                      Moment={Moment}
                      userInfo={userInfo}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <div className='d-flex justify-content-center'>
        <Pagination
          setCurrentPage={setCurrentPage}
          totalItems={totalItems}
          arrayLength={orders && orders.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </>
  )
}

export default OrderScreen
