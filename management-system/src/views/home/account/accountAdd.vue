<template>
    <div class="accountAdd">
        <p>添加账号</p>
        <el-form status-icon :rules="rules" :model="addAccount" ref="ruleAccountAddForm" label-width="100px">
            <el-form-item label="账号" prop="acc">
                <el-input v-model="addAccount.acc" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input v-model="addAccount.pwd" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户组" prop="accGroup">
                <el-select v-model="addAccount.accGroup" placeholder="请选择用户组">
                    <el-option label="超级会员" value="超级会员"></el-option>
                    <el-option label="普通会员" value="普通会员"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitAccountAdd">提交</el-button>
                <el-button @click="resetAccountAddForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    // 引入工具函数
    import {pwdReg} from "@/utils/reg.js";
    import {addAccount} from "../../../api/account"

    export default {

        data() {
            // 自定义验证密码
            const pwd = (rule, value, callback) => {
                // rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else if (!rule.pattern.test(value)) {
                    callback(new Error("密码包含数字和英文，长度 3 ~ 12 位"));
                } else {
                    callback();
                }
            };
            const accGroup = (rule, value, callback) => {
                // rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
                if (value === "") {
                    callback(new Error("请选择用户组"));

                } else {
                    callback();
                }
            };
            return {
                addAccount: {
                    acc: '',
                    pwd: "",
                    accGroup: ''
                },
                rules: {
                    acc:[
                        {
                            required:true,message:"请输入账号",trigger: "blur"
                        },{
                        min:4,max:8,message: "长度控制在[4,8]之间",trigger:'blur'
                        }
                    ],
                    accGroup:[
                        {
                            required:true,
                            validator: accGroup,
                            trigger: "change"
                        }
                    ],

                    pwd: [
                        {
                            required:true,
                            validator: pwd,
                            pattern: pwdReg(),
                            trigger: "blur"
                        }
                    ],

                }
            }
        },
        methods:{
            submitAccountAdd(){
                this.$refs.ruleAccountAddForm.validate(async valid => {
                        if (valid) {
                            let {code,message} = await addAccount(this.addAccount);
                            if (code === 1){
                                this.resetAccountAddForm();
                                this.$message({
                                    type: "success",
                                    message: "恭喜您，成功添加了一个账号!"
                                });
                                this.$router.push("/home/account/accountList");
                            }

                        } else {
                            return false;
                        }
                })
            },
            resetAccountAddForm(){
                this.$refs.ruleAccountAddForm.resetFields();
            }

        }
    }
</script>

<style lang="less" scoped>
    .accountAdd {
        p:nth-child(1) {
            text-indent: 22px;
            font-size: 20px;
            padding: 20px 0;
            border-bottom: 2px solid #ccc;
        }

        .el-form:nth-child(2) {
            width: 400px;
            padding: 50px 0;
        }

    }
</style>