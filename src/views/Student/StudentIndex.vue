<!--
 * @FileDescription: 学生主界面
 * 功能：存储学生账户名
 * @Author: AA1HSHH
 * @Date: 2020.06.14 
 * @LastEditTime: 2020.06.15
 -->
<template>
	<v-app>
		<NavBarStudent/>
		<v-main style="padding: 0 0 0 0;"  >	
			<router-view></router-view>
		</v-main>
	</v-app>
		
	
<!--  -->

</template>

<script>
 import NavBarStudent from '@/components/core/NavBarStudent'
	export default {
		name: 'StudentIndex',
		components:{NavBarStudent},
		data() {
			return {
				tabPosition: 'left',
				name: this.$route.params.acc
			}
		},
		created() {
			console.log("stu_index_name:" + this.$route.params.acc);
			console.log(sessionStorage.getItem("stuname"));
			if (sessionStorage.getItem("stuname") == "undefined" || sessionStorage.getItem("stuname") == null) {
				// 存储
				sessionStorage.setItem("stuname", this.$route.params.acc);
				// 检索
				var name = sessionStorage.getItem("stuname");
				console.log("store1:" + name);
			} else {
				var name2 = sessionStorage.getItem("stuname");
				console.log("store2:" + name2);
				this.name = sessionStorage.getItem("stuname");
			}

		},

		methods: {
			handleSelect(key, keyPath) {
				console.log("select");
				console.log(key, keyPath);

				/* this.$router.push({
				      path: key,
				      params: {data: 'query' }
				    })*/
			},
			showpwd() {
				console.log("getclick");
			},
			onSubmit() {
				console.log('submit!');
			},
			handleCommand(command) {
				if (command == "a") {
					this.$prompt('请输入邮箱', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',


					}).then(({
						value
					}) => {
						this.$message({
							type: 'success',
							message: '你的邮箱是: ' + value
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '取消输入'
						});
					});
				} else {

					sessionStorage.removeItem('stuname');

					//服务器端可能出错

					window.location.href = "";
				}
			}
		}
	}
</script>

<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}
</style>
