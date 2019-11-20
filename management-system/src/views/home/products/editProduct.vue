<template>
    <div class="productsList">
        <p class="fontWei">编辑商品</p>
        <el-form :model="productsList" ref="productsList" label-width="100px" class="demo-ruleForm marTop20">
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="productsList.goodsname"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="region">
                <el-select v-model="productsList.goodscategory" placeholder="请选择活动区域">
                    <el-option label="饮品" value="饮品"></el-option>
                    <el-option label="火锅" value="火锅"></el-option>
                    <el-option label="串串香" value="串串香"></el-option>
                    <el-option label="烧烤" value="烧烤"></el-option>
                    <el-option label="快餐" value="快餐"></el-option>
                    <el-option label="家常菜" value="家常菜"></el-option>
                    <el-option label="水果" value="水果"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜品特色" prop="goodsfeature">
                <el-checkbox-group v-model="productsList.goodsfeature">
                    <el-checkbox label="新品上市"></el-checkbox>
                    <el-checkbox label="第二单半价"></el-checkbox>
                    <el-checkbox label="主打产品"></el-checkbox>
                    <el-checkbox label="火爆产品"></el-checkbox>
                    <el-checkbox label="主传手艺"></el-checkbox>
                    <el-checkbox label="源自四川"></el-checkbox>
                    <el-checkbox label="百年招牌"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="活动时间" style="display: block;" required>
                <el-upload
                        style="width: 178px;height: 178px;border:1px dashed #ccc !important;"
                        class="avatar-uploader"
                        action="http://127.0.0.1/goods/upload"
                        :on-success="handleAvatarSuccess"
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="productsList.imgUrl" :src="'http://127.0.0.1:5000/upload/goods/' + productsList.imgUrl"
                         class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="是否促销" prop="isPromotion">
                <el-radio-group v-model="productsList.isPromotion">
                    <el-radio label="促销"></el-radio>
                    <el-radio label="不促销"></el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="食品规格" prop="goodsstandard">
                <el-radio-group v-model="productsList.goodsstandard">
                    <el-radio label="单规格"></el-radio>
                    <el-radio label="多规格"></el-radio>
                </el-radio-group>
            </el-form-item>

            <!-- 多规格 切换的子表格 -->
            <el-dialog width="600px" title="添加规格" :visible.sync="dialogFormVisible">
                <el-form :rules="rules" ref="multiForm" :model="multiSpecification">
                    <el-form-item prop="multiStandard" label="规格" label-width="160px">
                        <el-input style="width: 270px" v-model="multiSpecification.goodsstandard"
                                  autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="包装费" label-width="160px">
                        <el-input-number v-model="multiSpecification.packingexpense" :min="0" :max="20"
                                         label="包装费"></el-input-number>
                    </el-form-item>
                    <el-form-item label="价格" label-width="160px">
                        <el-input-number v-model="multiSpecification.goodsPrice" :min="20" label="价格"></el-input-number>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addStandard">确 定</el-button>
                </div>
            </el-dialog>
            <p v-show=!flag class="text-center">
                <el-button type="primary" @click="dialogFormVisible = true">添加规格</el-button>
            </p>

            <el-table
                    v-show=!flag
                    :data="productsList.tableData"
                    ref="multiTab"
                    style="width: 100%;margin-left: 26px;margin-top: 20px;">
                <el-table-column
                        prop="goodsstandard"
                        label="规格"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="packingexpense"
                        label="包装费"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="goodsPrice"
                        label="价格">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="delTabRow(scope.$index)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-form-item v-show=!flag class="marTop20" label="活动形式" prop="goodsdesc">
                <el-input type="textarea" v-model="productsList.goodsdesc"></el-input>
            </el-form-item>

            <!-- 单规格 切换的子表格 -->
            <el-form-item v-show=flag label="包装费" >
                <el-input-number v-model="productsList.packingexpense" :min="0" :max="20" label="包装费"></el-input-number>
            </el-form-item>
            <el-form-item v-show=flag label="价格" >
                <el-input-number v-model="productsList.goodsPrice" :min="20" label="价格"></el-input-number>
            </el-form-item>
            <el-form-item v-show=flag label="活动形式" prop="desc">
                <el-input type="textarea" v-model="productsList.goodsdesc"></el-input>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="submitForm(productsList)">保存</el-button>
                <el-button @click="resetForm('productsList')">重置</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import {upload, goodsadd} from "../../../api/goods"

    export default {
        data() {
            return {
                rules: {
                    goodsstandard: [{required: true, message: '账户必填,沙雕', trigger: 'blur'}]
                },
                num: 0,
                num1: 20,
                imageUrl: '',
                multiSpecification: {
                    goodsstandard: "",
                    packingexpense: 0,
                    goodsPrice: 20
                },
                dialogTableVisible: false,
                dialogFormVisible: false,
                productsList: {
                    goodsname: '',
                    goodscategory: '',
                    goodsfeature: [],
                    imgUrl:"",
                    isPromotion: '促销',
                    packingexpense: "",
                    goodsstandard: "单规格",
                    goodsPrice: "",
                    goodsdesc: "",
                    tableData: [{goodsstandard: "默认", packingexpense: 0, goodsPrice: 20,}]
                },


            };
        },
        methods: {
            //  重置整个添加商品表单
            resetForm(productsList) {
                this.$refs[addProduct].resetFields();
            },

            //  获取编辑的表单数据
            getEditForm(){
              let {goodsname,
                  goodscategory,
                  goodsfeature,
                    imgUrl,
                    isPromotion,
                    standard,
                    goodsdesc } = this.productsList;
              let goodInfro = JSON.parse(window.sessionStorage.getItem("goodInfro"));
                this.productsList.goodsname = goodInfro.goodsname;
                this.productsList.goodscategory = goodInfro.goodscategory;
                this.productsList.goodsfeature = JSON.parse(goodInfro.goodsfeature);
                this.productsList.imgUrl = goodInfro.imgUrl;
                this.productsList.isPromotion = goodInfro.isPromotion;
                this.productsList.goodsdesc = goodInfro.goodsdesc;

                // 判断是单规格还是多规格
                let standards = JSON.parse(goodInfro.standard);

                // 如果规格中只有一个对象 就是单规格
                if (standards[0].goodsstandard === "单规格") {
                    // 单规格
                    this.productsList.goodsstandard = "单规格";
                    this.productsList.packingexpense = standards[0].packingexpense; // 包装费
                    this.productsList.goodsPrice = standards[0].goodsPrice; // 价格
                } else {
                    // 多规格
                    this.productsList.goodsstandard = "多规格";
                    this.productsList.tableData = standards; // 直接给表单赋值
                }
            },

            //  提交整个表单数据
            async submitForm(v) {
                let {goodsname,
                    goodscategory,
                    goodsfeature,
                    imgUrl,
                    isPromotion,
                    packingexpense,
                    goodsstandard,
                    goodsPrice,
                    goodsdesc,
                    tableData
                } = this.productsList;
                console.log(this.product)
                let params = {
                    goodsname,
                    goodscategory,
                    goodsfeature:JSON.stringify(goodsfeature),
                    imgUrl,
                    isPromotion,
                    standard:goodsstandard === "单规格" ? JSON.stringify([{ goodsstandard, packingexpense, goodsPrice }])
                        : JSON.stringify(tableData),
                    goodsdesc
                };
                let {code,msg} = await goodsadd(params);
                if ( code === 1){
                    this.$message({
                        type:"success",
                        message:"恭喜您，商品修改成功！！！"
                    });
                }
                this.$router.push("/home/products/productList")
            },

            //  上传头像
            handleAvatarSuccess(res, file) {
                let {code, imgUrl} = res;
                if (code === 1) {
                    console.log(1)
                    this.productsList.imgUrl = imgUrl;
                }
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/png';
                const isPNG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!(isJPG || isPNG)) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return (isJPG || isPNG) && isLt2M;
            },

            //  多规格 - tab删除选项的实现
            delTabRow(index) {
                this.productsList.tableData.splice(index, 1)
            },

            //  多规格 - 模态框中的数据渲染到tab
            addStandard() {
                this.dialogFormVisible = false;
                this.$refs.multiForm.validate(v => {
                    if (v) {
                        this.productsList.tableData.unshift(this.multiSpecification);
                        this.multiSpecification = {
                            goodsstandard: "",
                            packingexpense: 0,
                            goodsPrice: 20};
                    }
                })
            },
        },
        computed: {
            flag() {
                return this.productsList.goodsstandard === "单规格" ? true : false;
            }
        },
        created() {
            this.getEditForm()
        }

    }
</script>

<style lang="less" scoped>
    .productsList {
        padding: 0 0 20px 0;

        & > p:nth-child(1) {
            padding: 20px 0 20px 20px;
            font-size: 20px;
            border-bottom: 2px solid #ccc;
        }

        & > .el-form {
            width: 600px;

            .avatar-uploader .el-upload {
                border: 1px dashed #f00 !important;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }

            .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
            }

            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 178px !important;
                height: 178px !important;
                line-height: 178px;
                text-align: center;
            }

            .avatar {
                width: 178px;
                height: 178px;
                display: block;
            }
        }

    }
</style>