<template>
    <div class="order">
        <el-form :model="searchForm" status-icon ref="orderForm" label-width="80px" class="demo-ruleForm">
            <el-row :gutter="20">

                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="订单号" size="small" prop="orderNo">
                            <el-input  v-model="searchForm.orderNo" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                </el-col>

                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="收货人" size="small" prop="consignee">
                            <el-input  v-model="searchForm.consignee" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                </el-col>

                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="手机号" size="small" prop="phone">
                            <el-input  v-model="searchForm.phone" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                </el-col>

            </el-row>
            <el-row :gutter="20">

                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="订单状态" size="small" prop="orderState">
                            <el-input  v-model="searchForm.orderState" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                </el-col>

                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="选择时间" size="small" prop="pass">
                            <el-date-picker
                                    size="small"
                                    v-model="searchForm.date"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>

                    </div>
                </el-col>

                <el-col :span="8">
                    <div class="orderBtn grid-content bg-purple text-right">
                        <el-form-item style="line-height: 0px !important;">
                            <el-button type="primary" size="small" @click="orderSubmit">提交</el-button>
                            <el-button size="small" @click="orderReset">重置</el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="orderNo"
                    label="订单号"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="orderTime"
                    label="下单时间"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="consignee"
                    label="收货人"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="deliverAddress"
                    label="配送地址"
                    width="260">
            </el-table-column>
            <el-table-column
                    prop="deliveryTime"
                    label="送达时间"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="remarks"
                    label="用户备注"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="orderAmount"
                    label="订单金额"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="orderState"
                    label="订单状态"
                    width="120">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button  type="text" @click="editOrder(scope.row)" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                class="text-center marTop20"
                @current-change="currentPageChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>


</template>

<script>
    import Moment from "moment"
    import {orderList} from "../../api/orders"
    export default {
        data(){
            return{
                // 订单表格数据
                tableData: [],
                // 搜索表单数据
                searchForm: {
                    orderNo: "",
                    consignee: "",
                    phone: "",
                    orderState: "",
                    date: []
                },
                currentPage: 1, // 当前页
                pageSize: 2, // 每页条数
                total: 6 // 总条数
            }
        },
        methods:{
            // 一进页面，渲染列表
            async getOrderList(){
                let params = {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                    orderNo: this.searchForm.orderNo,
                    consignee: this.searchForm.consignee,
                    phone: this.searchForm.phone,
                    orderState: this.searchForm.orderState,
                    date: JSON.stringify(this.searchForm.date)
                };
                // 发送请求 获取订单列表
                let { total, data } = await orderList(params);
                this.total = total;
                data.forEach(v => {
                    v.orderTime = Moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss");
                    v.deliveryTime = Moment(v.deliveryTime).format("YYYY-MM-DD hh:mm:ss");
                });
                this.tableData = data;

            },

            // 提交 要查询的内容 后端返回响应的数据，重新渲染
            orderSubmit(){
                    this.currentPage = 1;
                    this.getOrderList(); // 调用获取列表函数
            },

            // 查询列表中输入的值清空
            orderReset(){
                this.$refs.orderForm.resetFields();
            },

            // 当前页面发生改变时，改变 当前页的数值，然后再重新渲染列表
            currentPageChange(val){
                this.currentPage = val;
                this.getOrderList();
            },

            // 查看 - 进行单个项目的信息的修改及查看
            editOrder(row){
               // 1. 讲当前点击的项目的内容存储到本地
                console.log(row)
                window.sessionStorage.setItem("row",JSON.stringify(row))
               // 2. 跳转到新页面 - 进行数据编辑及查看
                this.$router.push("order/editOrder")
            }
        },
        created() {
            this.getOrderList();
        }
    }
</script>

<style lang="less" scoped>
    .order {
        padding: 20px 0 30px 0;

        & > .el-form {
            & > .el-row:nth-child(1) {
                padding: 0 20px 10px 10px;
            }

            & > .el-row:nth-child(2) {
                padding: 0 20px 20px 10px;

                .orderBtn {
                    .el-form-item {
                        margin-top: -5px;
                    }
                }
            }
        }
    }
</style>