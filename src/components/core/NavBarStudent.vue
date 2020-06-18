<!--
 * @FileDescription: 学生界面框架  
 * 布局：加载侧选框v-navigation-drawer，头部选框v-app-bar,底部标签
 * 功能：router处理用户界面选择，处理密码修改，登出操作
 * @Author: AA1HSHH
 * @Date: 2020.06.14 
 * @LastEditTime: 2020.06.16
 -->
<template>
	<nav>

		<v-app-bar flat app >
			<v-btn class="mx-2" fab color="teal" outlined @click="clickdraw">
				<v-icon>mdi-format-list-bulleted-square</v-icon>
			</v-btn>
			<v-toolbar-title class="text-uppercase grey--text">
				<span class="font-weight-light">毕业生就业</span>
				<span>管理系统</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn flat text color="grey" @click="changepass">
				<span>修改密码</span>
				
			</v-btn>
			<v-btn flat text color="grey" @click="exit">
				<span>登出</span>
				<v-icon right>mdi-exit-to-app</v-icon>
			</v-btn>
		</v-app-bar>
		
		<v-row justify="center">
		    <v-dialog v-model="dialog" persistent max-width="600px">
		     
		      <v-card>
		        <v-card-title>
		          <span class="headline">密码修改</span>
		        </v-card-title>
		        <v-card-text>
		          <v-container>
		            <v-row>
		              <v-col cols="12">
		                <v-text-field  v-model="name" label="账号" readonly></v-text-field>
		              </v-col>
		              <v-col cols="12">
		                <v-text-field label="密码*" type="password" v-model="newpass" required></v-text-field>
		              </v-col>
		            </v-row>
		          </v-container>
		        </v-card-text>
		        <v-card-actions>
		          <v-spacer></v-spacer>
		          <v-btn color="blue darken-1" text @click="dialog = false" >取消</v-btn>
		          <v-btn color="blue darken-1" text :disabled="newpass ==''" @click="submitpass">修改</v-btn>
		        </v-card-actions>
		      </v-card>
		    </v-dialog>
		  </v-row>


		<v-navigation-drawer app v-model="drawer" class="primary" dark :right="right" src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg">
			<!--  -->
			<v-list-item two-line :class="miniVariant && 'px-0'">
				<v-list-item-avatar>
					<v-icon>mdi-account-settings</v-icon>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>{{this.name}}同学</v-list-item-title>
					<v-list-item-subtitle>欢迎使用</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list >
				<v-list-item v-for="item in items" :key="item.title" router :to="item.route">
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>

				</v-list-item>

			</v-list>
		</v-navigation-drawer>

		<v-footer absolute="true">
			<v-card style="right: auto;">
				<v-card-text>
					<div>
						&copy; 2020, made with
						<a href="https://github.com/AA1HSHH/graduation-management-platform">AA1HSHH,cxx,ljd,zyj</a>
						<v-icon size="18">
							mdi-thumb-up
						</v-icon>
						by vue.js,vuetify.js .
					</div>
				</v-card-text>
			</v-card>
		</v-footer>
	</nav>
</template>

<script>
	export default {
		data() {
			return {
				drawer: true,
				name:'',
				dialog:false,
				newpass:'',
				items: [
					{
						title: '我的信息',
						icon: 'mdi-ballot',
						route: '/studentindex/studentinfo'
					},
					{
						title: '信息修改',
						icon: 'mdi-wrench',
						route: '/studentindex/studentconfig'
					},
					{
						title: '学校信息',
						icon: 'mdi-school',
						//route: '/studentindex/studentinfo'
						route: '/studentindex/studentstudyinfo'
					},
					{
						title: '就业信息',
						icon: 'mdi-briefcase-variant',
						//route: '/studentindex/studentinfo'
						route: '/studentindex/studentworkinfo',
						
					},
				],
			}
		},
		created() {
			this.name=sessionStorage.getItem("stuname");
		},
		methods: {
			clickdraw: function() {
				this.drawer = !this.drawer;
			},
			exit:function(){

			sessionStorage.removeItem('stuname');
			window.location.href = "/";	
			console.log("delect stuname!"+sessionStorage.getItem("stuname"));		
			},
			changepass:function(){
				this.dialog=true;
			},
			submitpass:function(){
				console.log("sid:"+this.name+"newpass:"+this.newpass);
				this.dialog=false;
				var self=this;	
				this.$axios({
						method: 'post',
						url: 'http://192.168.43.105/data.php?action=change_pass',
						data: {
							sid: self.name,
							newpass:self.newpass,
						}
					})
					.then((response) => {
						//self.tableData = response.data.data;
						console.log(response.data);
						self.$message({
						          showClose: true,
						          message: '修改成功',
						          type: 'success'
						        });
					})
					.catch((error) => {
						console.log(error);
						self.$message({
						          showClose: true,
						          message: '修改失败',
						          type: 'error'
						        });
					});	
			}
		},
	}
</script>

<style>
</style>
