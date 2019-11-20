<template>
    <div class="index">
        <el-row :gutter="20">
            <el-col :span="6"><div class="clearfix grid-content bg-purple">
                <i class="iconfont fl icon-tuanduicankaoxian- order"></i>
                <div class="fl marLef30 padTop10 text-center">
                    <p class="fontS20 fontWei">总订单</p>
                    <p class="fontS14 marTop5">102,400</p>
                </div>
            </div></el-col><el-col :span="6"><div class="clearfix grid-content bg-purple">
                <i class="iconfont fl icon-dangrixiaoshoue colorf60 order"></i>
                <div class="fl marLef30 padTop10 text-center">
                    <p class="fontS20 fontWei">总销售额</p>
                    <p class="fontS14 marTop5">102,400</p>
                </div>
            </div></el-col><el-col :span="6"><div class="clearfix grid-content bg-purple">
                <i class="iconfont fl icon-ic_salesadvice order colorsky"></i>
                <div class="fl marLef30 padTop10 text-center ">
                    <p class="fontS20 fontWei ">今日订单数</p>
                    <p class="fontS14 marTop5">102,400</p>
                </div>
            </div></el-col>
            <el-col :span="6">
                <div class="clearfix grid-content bg-purple">
                    <i class="iconfont fl icon-qian4 order colorLightGreen"></i>
                    <div class="fl marLef30 padTop10 text-center">
                        <p class="fontS20 fontWei">今日销售额</p>
                        <p class="fontS14 marTop5">102,400</p>
                    </div>
                </div>
            </el-col>

        </el-row>
        <div id="sales-charts" class="sales-charts" style="width: 100%; height: 360px;"></div>
    </div>

</template>

<script>


    export default {


    };
</script>

<style lang="less" scoped>
    .index {
        width: 100%;
        padding: 0 20px;
        background-color: #f2f2f2;
        .sales-charts {
            margin-top: 50px;
            background-color: #fff;
            padding: 20px;
            box-sizing: border-box;
        }
        .el-row {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .el-col {
            border-radius: 4px;
        }
        .bg-purple-dark {
            background: #99a9bf;
        }
        .bg-purple {
            background: #d3dce6;
        }
        .bg-purple-light {
            background: #e5e9f2;
        }
        .grid-content {
            padding: 6px 0 6px 20px;
            border-radius: 4px;
            min-height: 36px;
            background-color: #fff;
            .order{
                font-size: 60px;
                display: inline-block;
                color:#6697FF;
            }
        }
        .row-bg {
            padding: 10px 0;
            background-color: #f9fafc;
        }
    }

</style>