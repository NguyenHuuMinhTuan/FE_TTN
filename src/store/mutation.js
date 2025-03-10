const mutation = {
  //fetch
  SET_PRODUCT(state, products) {
    state.products = products;
  },
  SET_FEEDBACK(state, feedbacks){
    state.feedbacks = feedbacks;
  },
  SET_CART(state, carts){
    state.carts = carts;
  },
  SET_VOUCHER(state, vouchers){
    state.vouchers = vouchers
  },

  //add
  ADD_PRODUCT(state, newProduct){
    state.products.push(newProduct)
  },
  ADD_CART(state, newCart){
    state.carts.push(newCart)
  },
  
  //Delete 
  DELETE_PRODUCT(state, id) {
    if (state.allProducts && state.allProducts.length > 0) {
      const index = state.allProducts.findIndex((x) => x.id === id)
      if (index !== -1) {
        state.allProducts.splice(index, 1)
      } else {
        alert('Không tìm tháy sản phẩm !')
      }
    } else {
      console.error("San pham khong ton tai")
    }
  },
  DELETE_CART(state, { account_id, product_id }) {
    state.allCarts = state.allCarts.filter(
      (item) => !(item.account_id === account_id && item.product_id === product_id)
    );
  }
}
export default mutation;