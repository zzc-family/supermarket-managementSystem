<template>
    <el-header class="rightTop">
        <el-row :gutter="20">
            <el-col :span="16">
                <div class="grid-content bg-purple">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item
                                :key="i"
                                v-for="(item, i) in breadArr"
                                :to="{ path: item.path }"
                        >{{item.title}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content logo-mian bg-purple" >
                    <p >欢迎登陆，{{acc}}</p>
					<el-dropdown v-if="imgUrl" @command="handleCommand">
					  <img :src="'http://127.0.0.1:5000/upload/account/'+imgUrl" style="width:50px !important;display: inline-block;height: 50px !important;margin-left: 4px;border: 2px solid #ccc;box-sizing: border-box;border-radius: 50%;" class="el-dropdown-link" />
					  <el-dropdown-menu slot="dropdown">
					    <el-dropdown-item command="person" @click.native="backPersonalInfro">个人简历</el-dropdown-item>
					    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
                </div>
            </el-col>
        </el-row>

    </el-header>
</template>

<script>
    import {accountinfo} from "../../api/account"
    export default {
        name: "rightTop",
        data(){
            return{
                breadArr: [],
				acc:"",
				imgUrl:""
            }
        },
        methods:{
            //  退出系统
            handleCommand(command){
                if (command === "logout"){
                    // 清除本地缓存
                    localStorage.removeItem("token");
                    // 跳转到登录页面
                    this.$router.push("/login")
                    // 弹出提示信息 - 增加用户体验
                    this.$message({
                        type:"success",
                        message:"您已退出登录，欢迎您下次再来！！！"
                    })
                }
            },

            //  返回个人中心页面
            backPersonalInfro(){
               this.$router.push("/home/personalInfro")
            },

            // 计算面包屑
            calcBreadArr() {
                // 取出meta中的数组
                this.breadArr = this.$route.meta.breadArr;
            },
        
			// 获取当前登录的账号信息
			async getAccountInfo(){
				let {accountInfo} = await accountinfo();
				this.acc = accountInfo.acc;
				this.imgUrl = accountInfo.imgUrl;

			}
		},
        created() {
           this.getAccountInfo();

           //  头像 - 点击修改后动态改变
            this.$bus.$on("editAvatar",() => {
                this.getAccountInfo();
            })

            // 进入页面 加载 调用一次计算面包屑的函数
            this.calcBreadArr();
        },
        // 观察数据变化 执行相关的操作
        watch: {
            "$route.path"() {
                this.calcBreadArr(); // 计算面包屑
            }
        }
    };

</script>

<style lang="less" scoped>
    .rightTop {
        height: 60px;
        line-height: 60px;
        .el-breadcrumb {
            height: 60px;
            line-height: 60px;
            display: flex;
            align-items: center;
        }

        .logo-mian {
            display: flex;
            justify-content: center;

            .logo-img {
                .el-button{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #ccc;
                }
            }
        }
    }

</style>