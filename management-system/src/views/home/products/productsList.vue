<template>
    <div class="productsList paddBot20">
        <p style="padding: 20px 0;border-bottom: 2px solid #ccc;font-size: 20px;margin-bottom: 20px;text-indent: 20px;font-weight: bold">商品列表</p>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="商品图片">
                          <span>
                            <img
                                    width="100"
                                    height="100"
                                    style="border-radius: 4px"
                                    :src="'http://127.0.0.1:5000/upload/goods/' + props.row.imgUrl"
                            />
                          </span>
                        </el-form-item>
                        <el-form-item label="商品名称">
                            <span>{{ props.row.goodsname }}</span>
                        </el-form-item>
                        <el-form-item label="商品规格">
                            <span>{{ props.row.standard | standardFormat }}</span>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <span>{{ props.row.goodscategory }}</span>
                        </el-form-item>
                        <el-form-item label="是否促销">
                            <span>{{ props.row.isPromotion }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ props.row.goodsdesc }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品 ID"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="商品名称"
                    prop="goodsname">
            </el-table-column>
            <el-table-column
                    label="描述"
                    prop="goodsdesc">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                class="text-center marTop20"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total , prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>


</template>

<script>
    import {goodslist,goodsdel} from "../../../api/goods"

    export default {
        data() {
            return {
                currentPage:1,
                pageSize:2,
                total: 10,
                tableData: [{
                    goodscategory: "",
                    goodsdesc: "",
                    goodsfeature: [],
                    goodsname: "",
                    id: "",
                    imgUrl: "",
                    isPromotion: "",
                    standard: ""
                }]
            }
        },
        methods: {
            async getGoodsList() {
                let {total, data} = await goodslist({currentPage: this.currentPage, pageSize: this.pageSize})
                this.tableData = data;
                this.total = total;
            },
            handleEdit(index,row){
                window.sessionStorage.removeItem("goodInfro");
                window.sessionStorage.setItem("goodInfro",JSON.stringify(row));
                this.$router.push("/home/products/productEdit");
            },
            async handleDelete(index,row){
                let {code,msg} = await goodsdel({id:row.id})
                this.getGoodsList();
                this.$message({
                    type:"success",
                    message:"恭喜您，删除成功"
                })

            },
            handleCurrentChange(val){
                this.currentPage = val
                this.getGoodsList()
            }
        },
        created() {
            this.getGoodsList();
        },
        filters:{
            standardFormat(val){
                 let newVal = JSON.parse(val);
                 let newVal2 = newVal.map( v => {
                     return `${v.goodsstandard} 包装费:${v.packingexpense} 价格:${v.goodsPrice}`
                 })
                return newVal2.join("/")


            }
        }
    }
</script>

<style lang="less" scoped>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>