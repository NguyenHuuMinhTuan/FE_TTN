const getter={
    allProducts: state => state.products || [],
    allFeedbacks: state => state.feedbacks || [],
    allCarts: state => state.carts || [],
    allVouchers: state => state.vouchers || []

}
export default getter;