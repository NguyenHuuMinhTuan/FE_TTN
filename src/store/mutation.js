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
  SET_BILL(state, bills){
    state.bills = bills;
  },
  SET_VOUCHER(state, vouchers){
    state.vouchers = vouchers
  },
  SET_ALLBILLS(state, bills){
    state.bills = bills
  },
  SET_ACCOUNTS(state, accounts){
    state.accounts = accounts
  },

  //add
  ADD_PRODUCT(state, newProduct){
    state.products.push(newProduct)
  },
  ADD_CART(state, newCart){
    state.carts.push(newCart)
  },
  ADD_BILL(state, newBill){
    state.bills.push(newBill)
  },
  ADD_FEEDBACK(state, newFeedback){
    state.feedbacks.push(newFeedback)
  },
  ADD_ACCOUNT(state, newAccount){
    state.accounts.push(newAccount)
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
  },
  CLEAR_CART(state, { account_id }) {
    state.allBills = state.allBills.filter(
      (item) => !(item.account_id === account_id)
    );
  },

  //Update
  UPDATE_BILL(state, updatedBill) {
    const index = state.allBills.findIndex(bill => bill._id === updatedBill._id);
    if (index !== -1) {
      state.allBills[index] = updatedBill;
    }
  },
  UPDATE_ACCOUNT(state, updatedAccount) {
    const index = state.accounts.findIndex(acc => acc.id === updatedAccount.id);
    if (index !== -1) {
      state.accounts.splice(index, 1, updatedAccount);
    }
  }
}
export default mutation;