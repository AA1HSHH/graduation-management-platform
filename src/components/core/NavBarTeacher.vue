<!--
 * @FileDescription: 老师界面框架
 * 布局：加载侧选框v-navigation-drawer，头部选框v-app-bar,底部标签
 * 功能：router处理用户界面选择，处理密码修改，登出操作
 * @Author: AA1HSHH
 * @Date: 2020.06.14 
 * @LastEditTime: 2020.06.16
 -->

<template>
	<nav>

		<v-app-bar flat app >
			<v-btn class="mx-2" fab outlined color="teal" @click="clickdraw">
				<v-icon>mdi-format-list-bulleted-square</v-icon>
			</v-btn>
			<v-toolbar-title class="text-uppercase grey--text">
				<span class="font-weight-light">毕业生就业</span>
				<span>管理系统</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn flat text color="grey" @click="changepass">
				<span>修改密码</span>
				<!-- <v-icon right>mdi-exit-to-app</v-icon> -->
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
			              <!-- <v-col cols="12" sm="6" md="3">
			                <v-text-field label="Legal first name*" required></v-text-field>
			              </v-col>
			              <v-col cols="12" sm="6" md="3">
			                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
			              </v-col>
			              <v-col cols="12" sm="6" md="3">
			                <v-text-field
			                  label="Legal last name*"
			                  hint="example of persistent helper text"
			                  persistent-hint
			                  required
			                ></v-text-field>
			              </v-col> -->
			              <v-col cols="12">
			                <v-text-field  v-model="name" label="账号" readonly></v-text-field>
			              </v-col>
			              <v-col cols="12">
			                <v-text-field label="密码*" type="password" v-model="newpass" required></v-text-field>
			              </v-col>
			              <!-- <v-col cols="12" sm="6">
			                <v-select
			                  :items="['0-17', '18-29', '30-54', '54+']"
			                  label="Age*"
			                  required
			                ></v-select>
			              </v-col>
			              <v-col cols="12" sm="6">
			                <v-autocomplete
			                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
			                  label="Interests"
			                  multiple
			                ></v-autocomplete>
			              </v-col> -->
			            </v-row>
			          </v-container>
			          <!-- <small>*indicates required field</small> -->
			        </v-card-text>
			        <v-card-actions>
			          <v-spacer></v-spacer>
			          <v-btn color="blue darken-1" text @click="dialog = false">取消</v-btn>
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
					<v-list-item-title>{{this.name}}老师</v-list-item-title>
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



			<!-- to: '/helloworld/hi', -->





			<!--  -->


			


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
				// <el-menu-item index='/teacherindex/teacherinfo' >
				//     <i class="el-icon-setting"></i>
				//     <span slot="title">概况</span>
				//   </el-menu-item>
				
				//   <el-menu-item index='/teacherindex/teacherdetailinfo' >
				//     <i class="el-icon-setting"></i>
				//     <span slot="title">详细信息</span>
				//   </el-menu-item>
				//   <el-menu-item index='/teacherindex/teachernotice' >
				//     <i class="el-icon-menu"></i>
				//     <span slot="title">消息通知</span>
				//   </el-menu-item>
				// ['mdi-tooltip', '概况'],
				// ['mdi-tooltip-text', '详细信息'],
				// ['mdi-bell', '通知'],
				items: [
					{
						title: '概况',
						icon: 'mdi-tooltip',
						route: '/teacherindex/teacherinfo'
					},
					{
						title: '详细信息',
						icon: 'mdi-tooltip-text',
						route: '/teacherindex/teacherdetailinfo'
					},
					{
						title: '通知',
						icon: 'mdi-bell',
						//route: '/studentindex/studentinfo'
						route: '/teacherindex/teachernotice'
					},
					
				],
				/*['mdi-school', '学校信息'],
				['mdi-briefcase-variant', '就业信息'],
				['mdi-wrench', '信息修改'],
				['mdi-ballot', '信息查看'],*/
			}
		},
		created() {
			this.name=sessionStorage.getItem("teacname");
		},
		methods: {
			clickdraw: function() {
				this.drawer = !this.drawer;
			},
			exit:function(){
			
			//if(!(sessionStorage.getItem("teaname") == "undefined" || sessionStorage.getItem("teaname") == null)){
			sessionStorage.removeItem('teacname');
			window.location.href = "/";	
			console.log("delect teachername!"+sessionStorage.getItem("teacname"));
			//}
			
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
