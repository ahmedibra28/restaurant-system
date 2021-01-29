import {
  CART_REMOVE_ITEM,
  CART_ADD_ITEM,
  CART_REMOVE_ALL_ITEMS,
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find((x) => x._id === item._id)
      if (existItem) {
        const carts = []
        carts.push(state.cartItems.filter((x) => x._id === item._id))
        const newUpdateItem = {
          category: existItem.category,
          createdAt: existItem.createdAt,
          name: existItem.name,
          price: existItem.price,
          updatedAt: existItem.updatedAt,
          user: existItem.user,
          qty: existItem.qty + 1,
          _id: existItem._id,
        }
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id ? newUpdateItem : x
          ),
        }
      } else {
        const newItem = {
          category: item.category,
          createdAt: item.createdAt,
          name: item.name,
          price: item.price,
          updatedAt: item.updatedAt,
          user: item.user,
          qty: 1,
          _id: item._id,
        }

        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
      }
    case CART_REMOVE_ALL_ITEMS:
      return {
        ...state,
        cartItems: [],
      }

    default:
      return state
  }
}
