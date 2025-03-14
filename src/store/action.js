import axios from "axios";
const action = {
  //fetch
  async fetchProducts({ commit, state }) {
    if (state.products.length > 0) {
      console.log("API đã được lấy về");
      return
    }
    try {
      const response = await fetch('http://localhost:3000/product');
      console.log("Response status:", response.status);
      if (!response.ok) throw new Error("API không phản hồi");
      const data = await response.json();
      console.log("Dữ liệu từ API:", data);
      commit('SET_PRODUCT', data);
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
    }
  },
  async fetchFeedbacks({ commit, state }) {
    if (state.feedbacks.length > 0) {
      console.log("API đã được lấy về");
      return
    }
    try {
      const response = await fetch('http://localhost:3000/feedback');
      console.log("Response status:", response.status);
      if (!response.ok) throw new Error("API không phản hồi");
      const data = await response.json();
      console.log("Dữ liệu từ API Feedback:", data);
      commit('SET_FEEDBACK', data);
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
    }
  },
  async fetchCarts({ commit, state }, account_id) {
    if (state.products.length > 0) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/cart/${account_id}`);
      console.log("Response status:", response.status);

      if (!response.ok) throw new Error("API không phản hồi");

      const data = await response.json();
      console.log("Dữ liệu từ API:", data);

      commit('SET_CART', data);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  },
  async fetchVouchers({ commit, state }) {
    if (state.products.length > 0) {
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/voucher');
      console.log("Response status:", response.status);

      if (!response.ok) throw new Error("API không phản hồi");

      const data = await response.json();
      console.log("Dữ liệu từ API:", data);

      commit('SET_VOUCHER', data);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  },
  async fetchAllBills({ commit, state }) {
    if (state.bills.length > 0) {
      return
    }
    try {
      const response = await fetch("http://localhost:3000/billMongo")
      console.log(response.status);

      if (!response.ok) throw new Error("API không phản hồi")

      const data = await response.json()
      commit("SET_ALLBILLS", data);
    } catch (error) {
      console.log("có lỗi xảy ra :" + error);

    }
  },
  async fetchBills({ commit, state }, account_id) {
    if (state.products.length > 0) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/billMongo/${account_id}`);
      console.log("Response status:", response.status);

      if (!response.ok) throw new Error("API không phản hồi");

      const data = await response.json();
      console.log("Dữ liệu từ API:", data);

      commit('SET_BILL', data);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  },
  async fetchAccounts({ commit }) {
    try {
      const response = await axios.get("http://localhost:3000/account", {
        withCredentials: true, // Gửi cookie theo request
      });

      console.log("Dữ liệu từ API:", response.data);
      commit("SET_ACCOUNTS", response.data);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  },

  //POST
  async addFeedback({ commit }, newFeedback) {
    try {
      const response = await fetch("http://localhost:3000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeedback),
      });

      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Đánh giá đã thêm:", data);
      commit("ADD_FEEDBACK", data);
    } catch (error) {
      console.error("Lỗi khi thêm đánh giá:", error);
    }
  },
  async addProduct({ commit }, newProduct) {
    try {
      const response = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Sản phẩm đã thêm:", data);
      commit("ADD_PRODUCT", data);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  },
  async addCart({ commit }, newCart) {
    try {
      const response = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCart),
      });

      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Giỏ hàng đã thêm:", data);
      commit("ADD_CART", data);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  },
  async addAccount({ commit }, newAccount) {
    try {
      const response = await fetch("http://localhost:3000/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccount),
      });

      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Giỏ hàng đã thêm:", data);
      commit("ADD_ACCOUNT", data);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  },
  async addBill({ commit }, newCart) {
    try {
      const response = await fetch("http://localhost:3000/billMongo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCart),
      });

      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Giỏ hàng đã thêm:", data);
      commit("ADD_BILL", data);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  },

  //Delete

  async deleteProduct({ commit }, id) {
    try {
      const response = await fetch(`http://localhost:3000/product/${id}`, {
        method: "DELETE"

      });
      if (response.ok) {
        commit('DELETE_PRODUCT', id);
      } else {
        alert('Xoa that bai')
      }

    } catch (error) {
      console.error(error)
    }

  },
  async clearCart({ commit }, account_id) {
    try {
      const response = await fetch(`http://localhost:3000/cart/${account_id}`, {
        method: "DELETE"

      });
      if (response.ok) {
        commit('CLEAR_CART', account_id);
      } else {
        alert('Xoa that bai')
      }

    } catch (error) {
      console.error(error)
    }

  },
  async deleteCart({ commit }, { account_id, product_id }) {
    try {
      console.log("Gửi request xóa sản phẩm:", { account_id, product_id });

      const response = await fetch(`http://localhost:3000/cart/${account_id}/${product_id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        console.log("Xóa thành công, commit mutation DELETE_CART");
        commit('DELETE_CART', { account_id, product_id });
      } else {
        alert('Xóa thất bại!');
      }
    } catch (error) {
      console.error("Lỗi khi gọi API xóa sản phẩm:", error);
    }
  },

  //PUT
  async updateProduct({ commit }, updatedProduct) {
    try {
      const response = await fetch(`http://localhost:3000/product/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await response.json();

      if (response.ok) {
        commit('updateProduct', data);
      } else {
        console.error('Cập nhật sản phẩm thất bại:', data);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
    }
  },
  async updateBillFeedback({ commit }, account_id) {
    try {
      const response = await fetch(`http://localhost:3000/billMongo/${account_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback: true }), // Cập nhật feedback thành true
      });

      const data = await response.json();

      if (response.ok) {
        commit('UPDATE_BILL', data);
        console.log('Cập nhật feedback thành công:', data);
      } else {
        console.error('Cập nhật feedback thất bại:', data);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật feedback:', error);
    }
  },
  async updateAccountById({ commit }, {id, newAccount}) {
    console.log("Dữ liệu gửi lên API:", id, newAccount);
    try {

      const response = await fetch(`http://localhost:3000/account/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAccount), 
      });

      const data = await response.json();

      if (response.ok) {
        commit('UPDATE_ACCOUNT', data);
        console.log('Cập nhật account thành công:', data);
      } else {
        console.error('Cập nhật account thất bại:', data);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật account:', error);
    }
  },
  async updateActiveStatus({ commit }, id) {
    try {
        const response = await fetch(`http://localhost:3000/account/active/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (response.ok) {
            commit('UPDATE_ACCOUNT_ACTIVE', data);
            console.log('Cập nhật ACTIVE thành công:', data);
        } else {
            console.error('Cập nhật ACTIVE thất bại:', data);
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật ACTIVE:', error);
    }
}


}

export default action;