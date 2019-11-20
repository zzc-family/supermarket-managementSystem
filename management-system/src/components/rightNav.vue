<template>

        <el-container>
            <el-header ><right-top></right-top></el-header>
            <el-main >
                <right-bottom>
                </right-bottom>
            </el-main>
        </el-container>
</template>

<script>
    import RightTop from "./right/rightTop"
    import RightBottom from "./right/rightBottom"
    export default {
        components: {RightTop, RightBottom},
        RightTop,RightBottom
    }
</script>

<style lang="less" >
    .el-main{
        background-color: #f2f2f2;
    }
</style>