<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="less" >
    *{
        padding: 0;
        margin: 0;
    }
    input{
        outline: none !important;
    }
html,body{
    width: 100%;
    height: 100%;
}
    #app{
        width: 100%;
        height: 100%;
    }
</style>