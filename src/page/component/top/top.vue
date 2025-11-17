<template>
  <div class="main-header">
    <div class="main-header-left">
        <p class="name">Hi,我是xxx</p>
        <p class="detail">你的专属旅游助手，可以帮助你规划行程和解答出游问题哦！</p>
    </div>
    <div class="main-header-right">
        <img src="@/assets/111.png" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.main-header {
    display: flex;
    padding: 30px 0;
    .main-header-left {
        flex: 1; // 让左侧占据剩余空间
    }
    .main-header-right {
        flex: 1; // 让右侧也占据一定空间，可根据需要调整比例
    }
    img{
        width: 100%;
        object-fit: fill;
    }
    .name {
        font-size: 20px;
        color: #ff3474;
    }
    .detail{
        font-weight: bold;
        line-height: 2;
    }
}
</style>