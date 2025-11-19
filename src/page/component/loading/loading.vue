<template>
    <div class="circle-container">
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
// 组件样式
.circle-container {
    display: flex;
    align-items: center;

    .circle {
        width: 7px;
        height: 7px;
        border-radius: 50px;
        background-color: #5a5959;
        margin: 0 4px;
        animation: colorChange 1s linear infinite;
    }

    @keyframes colorChange {
        0% {
            background-color: #d6d5d5;
        }

        33% {
            background-color: #838383;
        }

        67% {
            background-color: #1c1c1c;
        }
    }

    .circle:nth-child(2) {
        animation-delay: 0.33s;
    }

    .circle:nth-child(3) {
        animation-delay: 0.66s;
    }
}
</style>