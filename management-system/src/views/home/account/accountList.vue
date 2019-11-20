<template>
    <div class="accountList">
        <p>账号列表</p>
        <div>
            <el-table
                    @selection-change="rowsCheckChange"
                    ref="multipleTable"
                    :data="tabledataBases.allData"
                    tooltip-effect="dark"
                    style="width: 100%"
            >
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="acc"
                        label="账号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="accGroup"
                        label="用户组"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="ctime"
                        label="登录时间"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="操作"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="rowEdit(scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="delCurrentData(scope.row)"
                        >清除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination
                    @size-change="currentPageSizeChange"
                    @current-change="currentPageChange"
                    :page-sizes="[1, 3, 5, 7]"
                    :current-page="tabledataBases.currentPage"
                    :page-size="tabledataBases.reports"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tabledataBases.total"> <!--总页数-->
            </el-pagination>
            <div style="margin-top: 20px">
                <el-button type="danger" @click="lotsDel">批量删除</el-button>
                <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
            </div>

<!--            编辑表格的模态框-->
            <el-dialog title="编辑信息" width="460px" :visible.sync="modelTable">
                <el-form style="width: 337px" :model="editFrom" >
                    <el-form-item label="用户名" label-width= "120px">
                        <el-input v-model="editFrom.acc" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户组" label-width="120px">
                        <el-select v-model="editFrom.accGroup" placeholder="请选择活动区域">
                            <el-option label="普通管理员" value="普通管理员"></el-option>
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modelTable = false">取 消</el-button>
                    <el-button type="primary" @click="editDatas(editFrom)">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Moment from "moment"
    import {listAccount,delAccount,accountbatchdel,accountedit} from "../../../api/account"

    export default {
        data() {
            return {
                editFrom:{
                    acc:"",
                    accGroup:""
                },
                modelTable: false,
                tabledataBases: {
                    currentPage: 1,// 当前页
                    reports: 1,  // 每页条数
                    total: 0, //总条数
                    allData: []  // 总数据
                },
                ids: []
            }
        },
        methods: {

            // 取消选择
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },

            // 一进页面 获取当前页
            async getTableList() {
                // 前端传入 当前页 和 每页条数
                let {total, data} = await listAccount({
                    currentPage: this.tabledataBases.currentPage,
                    reports: this.tabledataBases.reports
                });
                data.forEach(v => v.ctime = Moment(v.ctime).format("YYYY/MM/DD HH:mm:ss"))
                //  后端传入 总条数 和 当前页的数据
                this.tabledataBases.total = total;
                this.tabledataBases.allData = data;

            },

            //  当每页条数发生改变时 重新渲染页面
            currentPageSizeChange(val){
                this.tabledataBases.reports = val;
                this.getTableList();
            },

            //  - 当前页面点击发生改变，重新渲染页面 -
            currentPageChange(val){
                this.tabledataBases.currentPage = val;
                this.getTableList();
            },

            //  当前页面点击“删除”，删除当前数据
             delCurrentData({id}){

                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        }),
                        delAccount({id}),
                        this.getTableList();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });


            },

            //  - 批量删除 删除选中的项 -
             rowsCheckChange(val){
               return  this.ids = val.map( v => v.id);
            },
            lotsDel(){
                if(!this.ids.length){
                    this.$message.error("请选择要删除的项，在进行该操作，好不")
                    return
                }else{
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        accountbatchdel({ ids: JSON.stringify(this.ids)}),
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        }),
                        this.getTableList()
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }

            },

            //  每一项的 编辑
            rowEdit(row){
              this.modelTable = true;
              this.editFrom = {...row};
            },
            editDatas({ acc,accGroup, id }){
                this.$confirm('此操作将更改该文件信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    accountedit({acc,accGroup, id}),
                    this.$message({
                        type: 'success',
                        message: '更改成功!'
                    }),
                    this.modelTable = false,
                    this.getTableList();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消更改'
                    });
                });
            }
        },
        created() {
            this.getTableList(); // 进入页面 自动调用一次请求账号列表接口
        }
    }
</script>

<style lang="less" scoped>
    .accountList {
        p:nth-child(1) {
            text-indent: 22px;
            font-size: 20px;
            padding: 20px 0;
            border-bottom: 2px solid #ccc;
        }

        &>div:nth-child(2) {
            padding: 40px;

            .el-pagination {
                padding: 20px 0 0 0;
                text-align: center;
            }
        }
    }
</style>