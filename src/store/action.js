
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


  //POST
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
  }

}

export default action;