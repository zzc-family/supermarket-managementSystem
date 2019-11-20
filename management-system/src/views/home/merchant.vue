<template>
    <div class="merchant">
        <p class="fontS20 fontWei">店铺管理</p>
        <el-form :disabled="disabledIf" ref="merchant" :model="merchantForm" label-width="140px" class="marTop20">

            <el-form-item label="商品名称">
                <el-input v-model="merchantForm.shopname"></el-input>
            </el-form-item>

            <el-form-item label="详细地址">
                <el-input v-model="merchantForm.address"></el-input>
            </el-form-item>

            <el-form-item label="联系电话">
                <el-input v-model="merchantForm.phone"></el-input>
            </el-form-item>

            <el-form-item label="店铺简介">
                <el-input v-model="merchantForm.shopdesc"></el-input>
            </el-form-item>

            <el-form-item label="店铺标语">
                <el-input v-model="merchantForm.slogan"></el-input>
            </el-form-item>

            <el-form-item label="店铺分类">
                <el-select v-model="merchantForm.category" placeholder="请选择店铺">
                    <el-option label="可乐" value="可乐"></el-option>
                    <el-option label="炸鸡" value="炸鸡"></el-option>
                    <el-option label="火锅" value="火锅"></el-option>
                    <el-option label="串串香" value="串串香"></el-option>
                    <el-option label="抓饭" value="抓饭"></el-option>
                    <el-option label="拌面" value="拌面"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="店铺特点">
                <el-checkbox-group v-model="merchantForm.feature">
                    <el-checkbox label="品牌保证" name="type"></el-checkbox>
                    <el-checkbox label="蜂鸟专送" name="type"></el-checkbox>
                    <el-checkbox label="新店开铺" name="type"></el-checkbox>
                    <el-checkbox label="外卖保" name="type"></el-checkbox>
                    <el-checkbox label="准时达" name="type"></el-checkbox>
                    <el-checkbox label="开发票" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="配送费">
                <el-input-number v-model="merchantForm.packingexpense" :min="1" :max="10" label="配送费"></el-input-number>
            </el-form-item>

            <el-form-item label="起送价">
                <el-input-number v-model="merchantForm.minprice" :min="1" :max="10" label="起送价"></el-input-number>
            </el-form-item>

            <el-form-item label="营业时间">
                <el-time-picker
                        is-range
                        v-model="merchantForm.date"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围">
                </el-time-picker>
            </el-form-item>


            <el-form-item label="店铺头像">
                <el-upload
                        style="width: 178px;height: 178px;border:1px dashed #ccc !important;"
                        class="avatar-uploader"
                        action="http://127.0.0.1:5000/shop/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess1"
                        :before-upload="beforeAvatarUpload1">
                    <img style="width: 178px;height: 178px;" v-if="merchantForm.shopAvatar"
                         :src="'http://127.0.0.1:5000/upload/shop/'+ merchantForm.shopAvatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon text-center"
                       style="width: 178px;height: 178px;margin-top: 68px;font-size: 28px"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="营业执照">
                <el-upload
                        style="width: 178px;height: 178px;border:1px dashed #ccc !important;"
                        class="avatar-uploader"
                        action="http://127.0.0.1:5000/shop/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess2"
                        :before-upload="beforeAvatarUpload2">
                    <img style="width: 178px;height: 178px;" v-if="merchantForm.businessLicenseImg"
                         :src="'http://127.0.0.1:5000/upload/shop/'+ merchantForm.businessLicenseImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon text-center "
                       style="width: 178px;height: 178px;margin-top: 68px;font-size: 28px"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="餐饮服务许可证">
                <el-upload
                        style="width: 178px;height: 178px;border:1px dashed #ccc !important;"
                        class="avatar-uploader"
                        action="http://127.0.0.1:5000/shop/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess3"
                        :before-upload="beforeAvatarUpload3">
                    <img style="width: 178px;height: 178px;" v-if="merchantForm.cateringServiceLicenseImg"
                         :src="'http://127.0.0.1:5000/upload/shop/'+ merchantForm.cateringServiceLicenseImg"
                         class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon text-center"
                       style="width: 178px;height: 178px;margin-top: 68px;font-size: 28px"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="优惠活动">
                <el-select v-model="merchantForm.specialOffer" @change="dropDownList" placeholder="请选择优惠活动">
                    <el-option label="满减优惠" value="满减优惠"></el-option>
                    <el-option label="特惠大酬宾" value="特惠大酬宾"></el-option>
                    <el-option label="新用户立减" value="新用户立减"></el-option>
                    <el-option label="进店领券" value="进店领券"></el-option>
                </el-select>
            </el-form-item>
            <!--            优惠活动的模态框-->
            <el-dialog title="收货地址" width="600px" :visible.sync="flag">
                <el-form :model="form">
                    <el-form-item label="活动详情" label-width="120px">
                        <el-input v-model="form.detail" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="flag = false">取 消</el-button>
                    <el-button type="primary" @click="submitDialogData">确 定</el-button>
                </div>
            </el-dialog>


            <el-table
                    :data="merchantForm.tableData"
                    style="width: 100%;margin-left: 64px">
                <el-table-column
                        label="活动标题"
                        prop="title">
                </el-table-column>
                <el-table-column
                        label="活动名称"
                        prop="name">
                </el-table-column>
                <el-table-column
                        label="活动详情"
                        prop="detail">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>

        <el-button type="primary" class="marTop20" style="margin-left: 66px" @click="editMerchant">修改</el-button>
        <el-button type="success" @click="MerchantSave">保存</el-button>
    </div>

</template>

<script>
    import {shopsInfro, shopedit} from "../../api/shops"
    import Moment from "moment"

    export default {
        data() {
            return {
                dialogTableVisible: false,
                flag: false,
                date: [],
                form: {
                    detail: ""
                },
                disabledIf: true,
                title: "",
                merchantForm: {
                    shopname: "", // 名称
                    address: "", // 地址
                    phone: "", // 电话
                    shopdesc: "", // 描述
                    slogan: "", // 标语
                    category: "", // 分类
                    feature: [], // 特色
                    packingexpense: 0, // 配送费
                    minprice: 20, // 起送价
                    date: "", // 营业时间
                    shopAvatar: "", // 店铺头像
                    businessLicenseImg: "", // 营业执照
                    cateringServiceLicenseImg: "", // 餐饮服务许可证
                    specialOffer: "",
                    // 优惠活动表格
                    tableData: []
                }
            }
        },
        methods: {
            //  上传店铺头像
            handleAvatarSuccess1(res, file) {
                let {code, imgUrl} = res;
                if (code === 1) {
                    this.merchantForm.shopAvatar = imgUrl;
                }
            },
            beforeAvatarUpload1(file) {
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

            //  上传营业执照
            handleAvatarSuccess2(res, file) {
                let {code, imgUrl} = res;
                if (code === 1) {
                    this.merchantForm.businessLicenseImg = imgUrl;
                }
            },
            beforeAvatarUpload2(file) {
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

            //  上传餐饮服务许可证
            handleAvatarSuccess3(res, file) {
                let {code, imgUrl} = res;
                if (code === 1) {
                    this.merchantForm.cateringServiceLicenseImg = imgUrl;
                }
            },
            beforeAvatarUpload3(file) {
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

            // 删除按钮的实现
            handleDelete(index, row) {
                this.merchantForm.tableData.splice(index, 1);
            },

            //  下拉菜单模态框的实现
            dropDownList() {
                if (this.merchantForm.specialOffer) {
                    return this.flag = true;
                } else {
                    console.log(2)
                }
            },

            //  下拉菜单模态框 - 点击确定判断title的值
            submitDialogData() {
                this.flag = false;
                if (this.form.detail !== "") {
                    this.merchantForm.specialOffer === "满减优惠" ? this.title = "减" : this.merchantForm.specialOffer === "特惠大酬宾" ? this.title = "惠" : this.merchantForm.specialOffer === "新用户立减" ? this.title = "新" : this.title = "领";
                    let newObj = {
                        title: this.title,
                        name: this.merchantForm.specialOffer,
                        detail: this.form.detail
                    };
                    this.merchantForm.tableData.unshift(newObj)
                }
                this.form.detail = ""
            },

            // 修改按钮的实现
            editMerchant() {
                this.disabledIf = false
            },

            //  获取店铺管理信息
            async getMerchantInfro(){
                let {data} = await shopsInfro();
                for (var key in data){
                    if (key === "date" || key === "feature" || key === "tableData"){
                        data[key] = JSON.parse(data[key])
                    }
                }
                this.merchantForm = {...data}
            },

            // 保存按钮的实现
            async MerchantSave() {
                let {shopname, address, phone, shopdesc, slogan, category, feature, packingexpense, minprice, date, shopAvatar, businessLicenseImg, cateringServiceLicenseImg, tableData} = this.merchantForm;
                let {code, msg} = await shopedit({
                    shopname,
                    address,
                    phone,
                    shopdesc,
                    slogan,
                    category,
                    feature: JSON.stringify(feature),
                    packingexpense,
                    minprice,
                    date: JSON.stringify(date),
                    shopAvatar,
                    businessLicenseImg,
                    cateringServiceLicenseImg,
                    tableData: JSON.stringify(tableData)
                });
                this.disabledIf = true;
            }
        },
        created() {
            this.getMerchantInfro();
        }

    }
</script>

<style lang="less" scoped>
    .merchant {
        padding: 0 0 40px 0;

        & > p:nth-child(1) {
            padding: 20px 0;
            text-indent: 20px;
            border-bottom: 2px solid #ccc;
        }

        & > .el-form {
            width: 600px;
        }
    }
</style>