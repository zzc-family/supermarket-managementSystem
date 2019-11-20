<template>
    <div class="login">
        <div :style="note" class="bgI"></div>
        <el-form :rules="rules" :model="loginForm" status-icon ref="loginForm" label-width="100px"
                 class="demo-ruleForm loginM">

            <h3 class="text-center fontWei fontS24">用户登录</h3>
            <el-form-item label="用户名" prop="acc">
                <el-input v-model="loginForm.acc" prefix-icon="iconfont icon-yidongduanicon-"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="pwd">
                <el-input @click.native="changeType" v-model="loginForm.pwd"
                          :suffix-icon="flag?'iconfont icon-yanjing':'iconfont icon-z'"
                          prefix-icon="iconfont icon-mima" :type="flag?'password':'text'" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" class="login-btn" @click="submitForm">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    // 引入本地存储工具函数
    import local from "@/utils/local";
    import {checkLogin} from "../api/account"
    export default {
        data() {
            return {
                flag: true,
                loginForm: {
                    acc: "",
                    pwd: ""
                },
                note: {
                    backgroundImage: "url(" + require("./../assets/imgs/us/5e4e3abeb728d305b02cb62b96c9d56f.jpg") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    filter: "blur(20px)"

                },
                rules: {
                    acc: [
                        {required: true, message: '账户必填,沙雕', trigger: 'blur'}, {
                            min: 2,
                            max: 8,
                            message: '长度在2到8个字符之间',
                            trigger: 'blur'
                        }
                    ],
                    pwd: [
                        {required: true, message: "密码必填，不填不让你登", trigger: "blur"}, {
                            min: 3,
                            max: 12,
                            message: '长度在3到12个字符之间',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            changeType(e) {
                if (e.target.className.includes("icon-yanjing")) {
                    this.flag = !this.flag;
                }
                if (e.target.className.includes("icon-z")) {
                    this.flag = !this.flag;
                }
            },
            submitForm() {
                this.$refs.loginForm.validate(async valid => {
                    if (valid) {
                       let { code, token } = await checkLogin({acc:this.loginForm.acc,pwd:this.loginForm.pwd})
                        if(code === 1 ){
                            localStorage.setItem("token",token);
                            this.$message({
                                type: "success",
                                message: "恭喜您，成功黑入该后台!"
                            });
                            this.$router.push("/home/index")
                        }else{
                           return  this.$message.error('抱歉，无此账号！');
                        }
                    } else {
                        return this.$message.error('登录失败，请检查用户名或密码');
                    }

                })
            }
        }
    }
</script>

<style lang="less">

    .login {

        width: 100%;
        height: 100%;

        #box {
            width: 100%;
            height: 100%;
        }

        .bgI {
            position: relative;
            z-index: 1;
            width: 100%;
            height: 100%;
        }

        .loginM {
            & > h3:nth-child(1) {
                margin: 0 0 20px 40px;
            }

            position: absolute;
            padding: 30px 50px 40px 20px;
            left: 50%;
            top: 50%;
            z-index: 99;
            width: 400px;
            transform: translate(-50%, -50%);
            filter: blur(0px);
            background-color: #ccc;
            border-radius: 12px;

            .login-btn {
                width: 230px;
            }
        }
    }

</style>