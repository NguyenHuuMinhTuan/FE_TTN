const getter={
    allProducts: state => state.products || [],
    allFeedbacks: state => state.feedbacks || [],
    allCarts: state => state.carts || [],
    allVouchers: state => state.vouchers || [],
    allBills: state => state.bills || []

}
export default getter;