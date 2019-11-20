<template>

    <div class="revisePwd">
        <p>修改密码</p>
        <el-form :rules="rules" :model="dataRevisePwd" status-icon ref="revisePwd" label-width="100px">
            <el-form-item label="原密码" prop="oldPwd">
                <el-input v-model="dataRevisePwd.oldPwd" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
                <el-input v-model="dataRevisePwd.newPwd" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmPwd">
                <el-input type="password" autocomplete="off" v-model="dataRevisePwd.confirmPwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="confirmPwd">确定</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>

    </div>

</template>

<script>
    import {pwdReg} from "@/utils/reg.js"
    import {checkoldpwd, passwordedit} from "../../../api/account"

    export default {

        data() {
            // 自定义验证密码
            const oldPwd = async (rule, value, callback) => {
                // rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
                // 发送请求 验证旧密码是否正确
                let {code, msg} = await checkoldpwd({oldPwd: value});
                if (!value) {
                    callback(new Error("请输入原密码"));
                } else if (code === "0") {
                    callback(new Error(msg)); // 旧密码错误
                } else {
                    callback(); // 成功
                }
            };
            const newPwd = (rule, value, callback) => {
                // rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else if (!rule.pattern.test(value)) {
                    callback(new Error("密码包含数字和英文，长度 3 ~ 12 位"));
                } else if (value === this.dataRevisePwd.newPwd) {
                    callback(new Error("不能和原密码相同"));
                } else {
                    // 如果确认新密码不为空
                    if (this.dataRevisePwd.confirmPwd !== "") {
                        this.$refs.revisePwd.validateField("confirmPwd"); // 再次触发某个“字段”的验证
                    }
                    callback();
                }
            };
            const confirmPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码!'));
                } else if (value !== this.dataRevisePwd.newPwd) {
                    callback(new Error('两次输入的密码不一致，请重新输入！'));
                } else {
                    callback();
                }


            };
            return {
                dataRevisePwd: {
                    oldPwd: '',
                    newPwd: "",
                    confirmPwd: ""
                },
                rules: {
                    oldPwd: [
                        {
                            required: true,
                            validator: oldPwd,
                            pattern: pwdReg(),
                            trigger: "blur"
                        }
                    ],
                    newPwd: [
                        {
                            required: true,
                            validator: newPwd,
                            pattern: pwdReg(),
                            trigger: "blur"
                        }
                    ],
                    confirmPwd: [
                        {
                            required: true,
                            validator: confirmPwd,
                            pattern: pwdReg(),
                            trigger: "blur"
                        }
                    ]
                }
            }
        },
        methods: {
            reset() {
                this.$refs.revisePwd.resetFields();
            },
            confirmPwd() {
                this.$refs.revisePwd.validate(async data => {
                    if (data) {
                        let {code, msg} = await passwordedit({newPwd: this.dataRevisePwd.newPwd})
                        if (code === 1) {
                            this.$router.push("/login");
                            this.$message({
                                type: "success",
                                message: msg
                            });
                        }
                    } else {
                        return false;
                    }
                })
            }
        }

    }
</script>

<style lang="less" scoped>
    .revisePwd {
        p:nth-child(1) {
            text-indent: 22px;
            font-size: 20px;
            padding: 20px 0;
            border-bottom: 2px solid #ccc;
        }

        .el-form {
            width: 400px;
            padding: 40px 30px;
        }
    }
</style>