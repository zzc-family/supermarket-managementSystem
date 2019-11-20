<template>
    <div class="home">
        <el-container>
            <LeftNav></LeftNav>
            <RightNav></RightNav>
        </el-container>

    </div>
</template>

<script>
    import LeftNav from "../components/leftNav"
    import RightNav from "../components/rightNav"
    export default {
        components:{
            LeftNav,RightNav
        },
        data() {
            return {}
        }
    }
</script>

<style lang="less">
    * {
        margin: 0;
        padding: 0;
        list-style: none;
        text-decoration: none;
    }

    .home {

        height: 100%;

        .el-container {
            height: 100%;

            .nav-top {
                background-color: #6697FF;
                height: 60px;
                padding: 0 16px;
                line-height: 60px;
                color: white;
                font-weight: bold;
                text-align: center;
                font-size: 16px;
            }

        }
    }

</style>