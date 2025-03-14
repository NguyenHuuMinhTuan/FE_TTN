<template>
    <div class="not-found">
      <div class="text">
        <h1>404</h1>
        <p>Can Not Found</p>
        <button @click="goHome">🏠 Trở lại trang chủ</button>
      </div>
      <div class="lines-container">
        <div v-for="n in 30" :key="n" class="line" :style="generateLineStyle()"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goHome() {
        this.$router.push("/"); // Điều hướng về trang chủ
      },
      generateLineStyle() {
        const delay = Math.random() * 3;
        const left = Math.random() * 100 + "vw";
        const height = Math.random() * 100 + "vh";
        return {
          left,
          height,
          animationDelay: `${delay}s`,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .not-found {
    background: black;
    color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }
  
  .text {
    text-align: center;
  }
  
  h1 {
    font-size: 200px;
    margin: 0;
    font-weight: bold;
  }
  
  p {
    font-size: 30px;
    margin-top: -20px;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 18px;
    background: white;
    color: black;
    border: none;
    cursor: pointer;
    transition: 0.3s;
  }
  
  button:hover {
    background: red;
    color: white;
  }
  
  .lines-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  
  .line {
    position: absolute;
    width: 2px;
    background: white;
    bottom: 0;
    animation: grow 3s linear infinite;
  }
  
  @keyframes grow {
    0% {
      height: 0;
    }
    100% {
      height: 100%;
    }
  }
  </style>
  