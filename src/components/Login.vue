<!--
 * @FileDescription: 登录界面   
 * 对于https://github.com/doterlin/vue-example-login项目做了简单的改动
 * 新增功能：注册
 * @Author: AA1HSHH
 * @Date: 2020.06.14 
 * @LastEditTime: 2020.06.17
 -->
<template>
	<div class="login" id="login">
		<a href="javascript:;" class="log-close"><i class="icons close"></i></a>
		<div class="log-bg">
			<div class="log-cloud cloud1"></div>
			<div class="log-cloud cloud2"></div>
			<div class="log-cloud cloud3"></div>
			<div class="log-cloud cloud4"></div>

			<div class="log-logo">欢迎使用!</div>
			<div class="log-text">@课题九小组</div>
		</div>
		<div class="select">
			<el-radio v-model="radio" label="1">学生登录</el-radio>
			<el-radio v-model="radio" label="2">教师登录</el-radio>
			<v-btn text normal color="indigo" @click="signin=true">注册</v-btn>
		</div>


		<div class="log-email">
			<input type="text" placeholder="用户名" :class="'log-input' + (account==''?' log-input-empty':'')" v-model="account"><input
			 type="password" placeholder="密码" :class="'log-input' + (password==''?' log-input-empty':'')" v-model="password">
			<a href="javascript:;" class="log-btn" @click="login">登录</a>
			<!-- <h1>{{account}}</h1>
			<h1>{{password}}</h1>
			<h1>{{radio}}</h1> -->
			<h1></h1>
		</div>
		<v-dialog v-model="signin" persistent max-width="600px">
			<template>

			</template>
			<v-card>
				<v-card-title>
					<span class="headline">用户 注册</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>

							<v-col cols="12">
								<v-text-field label="用户名*" v-model="newsid" required></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field label="密码*" type="password" v-model="newpass" required></v-text-field>
							</v-col>
							<v-col cols="12" sm="6">
								<v-select :items="['学生', '老师']" label="状态*" v-model="newstatus" required></v-select>
							</v-col>

						</v-row>
					</v-container>
					<small>*必填</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="signin = false">取消</v-btn>
					<v-btn color="blue darken-1" text :disabled="newpass==''||newsid==''||newstatus==''" @click="submit_signin">注册</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog v-model="studentdialog" persistent max-width="600px">
			<template>

			</template>
			<v-card>
				<v-card-title>
					<span class="headline">用户注册</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="12">
								<v-text-field label="姓名*" v-model="newsname" required></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field label="电话" v-model="newteleph" required></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-select item-text="title" item-value="id" :items="item" label="学院*" v-model="id" required>
								</v-select>
							</v-col>
							<v-col cols="12">
								<v-select :items="showmajor()" label="专业*" v-model="newmajor" required></v-select>
							</v-col>
							<v-col cols="12">
								<v-select :items="['1','2','3','4']" label="班级*" v-model="newclass" required></v-select>
							</v-col>
							<!-- newsituation -->
							<v-col cols="12">
								<v-select :items="situation" item-text="title" item-value="id" label="状态*" v-model="newsituation" required></v-select>
							</v-col>
						</v-row>
					</v-container>
					<small>*必填</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="studentdialog = false">取消</v-btn>
					<v-btn color="blue darken-1" text @click="submit_info">提交</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		
		
		
		<v-dialog v-model="employdialog" persistent max-width="600px">
			<template>
		
			</template>
			<v-card>
				<v-card-title>
					<span class="headline">就业信息表</span>
				</v-card-title>
				<v-card-text>
					<v-container>
					<el-form ref="form" :model="form" label-width="80px" >
						<el-form-item label="公司名称*">
							<el-tooltip>
								<div slot="content">公司名称必填</div>
							<el-input v-model="form.name"></el-input>	
							</el-tooltip>
							
					
						</el-form-item>
					
						
					
						<el-form-item label="公司行业*">
							<el-tooltip placement="top">
							<div slot="content">公司行业必填</div>
							<v-select v-model="form.region" :items="items" :rules="[v => !!v || '必填']" label="" required>
									
							</v-select>  
							</el-tooltip>
							
					
						</el-form-item>
					
						<el-form-item label="招聘时间">
					
							<el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;" :picker-options="pickerOptions"
							 value-format="yyyy-MM-dd"></el-date-picker>
					
						</el-form-item>
					
						<el-form-item label="学历">
							<el-radio-group v-model="form.resource">
								<el-radio label="本科生"></el-radio>
								<el-radio label="研究生"></el-radio>
								<el-radio label="博士生"></el-radio>
							</el-radio-group>
					
						</el-form-item>
					
						<el-form-item label="岗位">
							<el-input v-model="form.occup"></el-input>
					
						</el-form-item>
					
						<el-form-item label="薪水">
							<el-input v-model="form.salary"></el-input>
					
						</el-form-item>
					</el-form>	
					</v-container>
					<small>*必填</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="employdialog = false">取消</v-btn>
					<v-btn color="blue darken-1" text @click="submit_employ_info">提交</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				isLoging: false,
				account: '',
				password: '',
				radio: '1',
				signin: false,
				studentdialog: false,
				employdialog:false,
				newsid: '',
				newpass: '',
				newstatus: '',
				newsituation: '',

				newsname: '',
				newteleph: '',
				newdepart: '',
				newmajor: '',
				newclass: '',
				
				form: {
					name: '',
					region: '',
					date: '',
					type: [],
					resource: '',
					desc: '',
					salary: '',
					occup: ''
				},
				situation:[{id:'0',title:'就业'},
				{id:'1',title:'考研'},
				{id:'2',title:'找工作'},
				{id:'3',title:'创业'},],

				id: 1,
				items: [
				
				'电信业',
				'计算机服务及软件业',
				'电子设备制造业',
				'农林渔牧业',
				'社会保障业',
				'食品饮料制造业',
				'交通运输业',
				'物流业',
				'群众团体、社会团体和宗教组织',
				'零售业',
				'医疗卫生业',
				'餐饮业',
				'娱乐业',
				'公共教育业',
				'银行金融业'],
				item: [{
						id: 1,
						title: '通信与信息工程学院',
						major: ['通信工程', '电子信息工程', '电子信息工程科学与技术']
					},
					{
						id: 2,
						title: '电子科学与工程学院',
						major: ['电子科学与技术', '电磁场与无线技术', '微电子学']
					},
					{
						id: 3,
						title: '光电工程学院',
						major: ['光电信息工程', '信息显示与光电技术', ]
					},
					{
						id: 4,
						title: '材料科学与工程学院',
						major: ['高分子材料与工程', '材料化学']
					},
					{
						id: 5,
						title: '计算机软件学院',
						major: ['计算机科学与技术', '信息安全', '软件工程']
					},
					{
						id: 6,
						title: '自动化学院',
						major: ['自动化工程', '测控技术与仪器', '电气工程及其自动化']
					},
					{
						id: 7,
						title: '物联网学院',
						major: ['网络工程', '物联网工程']
					},
					{
						id: 8,
						title: '理学院',
						major: ['信息计算科学', '统计学']
					},
					{
						id: 9,
						title: '地理与生物信息学院',
						major: ['地理信息系统', '生物医学工程']
					},
					{
						id: 10,
						title: '传媒与艺术学院',
						major: ['数字媒体技术', '广告学', '教育技术学']
					},
				],

			}
		},

		methods: {
			showmajor: function() {
				console.log(this.item[this.id - 1].major);
				return this.item[this.id - 1].major;
			},
			//employdialog
			submit_employ_info: function() {
				var self = this;
				this.$axios({
					method: 'post',
					url: 'http://192.168.43.105/data.php?action=enroll_employ',
					data: {
						//sid,cname,cindustry,empdate,occup,qual,salary
						sid: self.newsid,
						
						situation: self.radio - 1,
						cname: self.form.name,
						cindustry: self.form.region,
						empdate: self.form.date,
						occup: self.form.occup,
						qual: self.form.resource,
						salary: self.form.salary,
						
			
					}
				}).then((response) => {
					if (response.data == true || response.data == 'true')
						self.$message({
							showClose: true,
							message: '信息提交成功',
							type: 'success'
						});
					else {
						self.$message({
							showClose: true,
							message: '信息提交失败',
							type: 'error'
						});
					}
				}).catch((error) => {
					self.$message({
						showClose: true,
						message: '信息提交失败',
						type: 'error'
					});
				});
				this.employdialog = false;
			},
			submit_info: function() {
				var self = this;
				this.$axios({
					method: 'post',
					url: 'http://192.168.43.105/data.php?action=enroll_student',
					data: {
						newsid: self.newsid,
						newsname: self.newsname,
						newteleph: self.newteleph,
						newdepart: self.item[self.id - 1].title,
						newmajor: self.newmajor,
						newclass: self.newclass,
						newsituation:self.newsituation,

					}
				}).then((response) => {
					if (response.data == true || response.data == 'true'){
						self.$message({
							showClose: true,
							message: '信息提交成功',
							type: 'success'
						});
						this.studentdialog = false;
						if(this.newsituation==0) this.employdialog = true;
					}
						
					else {
						self.$message({
							showClose: true,
							message: '信息提交失败',
							type: 'error'
						});
					}
				}).catch((error) => {
					self.$message({
						showClose: true,
						message: '信息提交失败',
						type: 'error'
					});
				});
				
			},
			
			submit_signin: function() {
				this.signin = false;

				var self = this;
				if (this.newstatus == '老师') this.newstatus = 2;
				else {
					this.newstatus = 1;
					this.studentdialog = true;
				}
				this.$axios({
						method: 'post',
						url: 'http://192.168.43.105/data.php?action=get_enroll',
						data: {
							newsid: self.newsid,
							newpass: self.newpass,
							newstatus: self.newstatus

						}
					})
					.then((response) => {
						if (response.data == true || response.data == 'true')
							self.$message({
								showClose: true,
								message: '注册成功',
								type: 'success'
							});
						else {
							self.$message({
								showClose: true,
								message: '注册失败',
								type: 'error'
							});
						}

					})
					.catch((error) => {
						console.log(error);
						self.$message({
							showClose: true,
							message: '注册失败',
							type: 'error'
						});
					});
			},


			login() {
				var self = this;
				if (this.account == '' || this.password == '') {
					//this.toLogin();
					this.$message({
						showClose: true,
						message: '缺少用户名或密码',
						type: 'error'
					});
				}
				if (this.account != '' || this.password != '') {

					sessionStorage.removeItem('name');
					sessionStorage.clear();
					this.$axios({
							method: 'post',
							url: 'http://192.168.43.105/data.php?action=check_login',

							headers: {
								'content-type': 'application/x-www-form-urlencode'
							},
							data: {
								sid: this.account,
								pwd: this.password,
								status: this.radio,
							}
						})
						.then(function(response) {
							console.log(response.data.data);
							if (response.data.data == "true") {
								if (self.radio == 1)
									self.$router.push({
										name: 'StudentInfo',
										params: {
											acc: self.account
										}
									});
								else
									self.$router.push({
										name: 'TeacherInfo',
										params: {
											acc: self.account
										}
									});
							} else {
								self.$message({
									showClose: true,
									message: '用户名或密码错误',
									type: 'error'
								});
							}


						})
						.catch(function(error) {
							self.$message({
								showClose: true,
								message: '服务器出错 请联系管理员',
								type: 'error'
							});

						});
				}

			},
		}
	}
</script>

<style scoped>
	.login {
		position: fixed;
		overflow: hidden;
		left: 50%;
		margin-left: -250px;
		top: 50%;
		margin-top: -350px;
		width: 500px;
		min-height: 555px;
		z-index: 10;
		right: 140px;
		background: #fff;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		-ms-border-radius: 5px;
		-o-border-radius: 5px;
		border-radius: 5px;
		-webkit-box-shadow: 0px 3px 16px -5px #070707;
		box-shadow: 0px 3px 16px -5px #070707
	}

	.log-close {
		display: block;
		position: absolute;
		top: 12px;
		right: 12px;
		opacity: 1;
	}

	.log-close:hover .icons {
		transform: rotate(180deg);
	}

	.log-close .icons {
		opacity: 1;
		transition: all .3s
	}

	.log-cloud {
		background-image: url(../assets/login-cloud.png);
		width: 63px;
		height: 40px;
		position: absolute;
		z-index: 1
	}

	.login .cloud1 {
		top: 21px;
		left: -30px;
		transform: scale(.6);
		animation: cloud1 20s linear infinite;
	}

	.login .cloud2 {
		top: 87px;
		right: 20px;
		animation: cloud2 19s linear infinite;
	}

	.login .cloud3 {
		top: 160px;
		left: 5px;
		transform: scale(.8);
		animation: cloud3 21s linear infinite;
	}

	.login .cloud4 {
		top: 150px;
		left: -40px;
		transform: scale(.4);
		animation: cloud4 19s linear infinite;
	}

	.log-bg {
		background: url(../assets/login-bg.jpg);
		width: 100%;
		height: 312px;
		overflow: hidden;
	}

	.log-logo {
		height: 80px;
		margin: 120px auto 25px;
		text-align: center;
		color: #000000;
		font-weight: bold;
		font-size: 40px;
	}

	.log-text {
		color: #000000;
		font-size: 13px;
		text-align: center;
		margin: 0 auto;
	}

	.log-logo,
	.log-text {
		z-index: 2
	}

	.icons {
		background: url(../assets/logo.png) no-repeat;
		display: inline-block;
	}

	.close {
		height: 16px;
		width: 16px;
		background-position: -13px 0;
	}

	.login-email {
		height: 17px;
		width: 29px;
		background-position: -117px 0;
	}

	.log-btns {
		padding: 15px 0;
		margin: 0 auto;
	}

	.log-btn {
		width: 402px;
		display: block;
		text-align: left;
		line-height: 50px;
		margin: 0 auto 15px;
		height: 50px;
		color: #fff;
		font-size: 13px;
		-webkit-border-radius: 5px;
		background-color: #3B5999;
		-moz-border-radius: 5px;
		-ms-border-radius: 5px;
		-o-border-radius: 5px;
		border-radius: 5px;
		position: relative;
	}

	.log-btn.tw {
		background-color: #13B4E9
	}

	.log-btn.email {
		background-color: #50E3CE
	}

	.log-btn:hover,
	.log-btn:focus {
		color: #fff;
		opacity: .8;
	}

	.log-email {
		text-align: center;
		margin-top: 20px;
	}

	.log-email .log-btn {
		background-color: #50E3CE;
		text-align: center;
	}

	.log-input-empty {
		border: 1px solid #f37474 !important;
	}

	.isloading {
		background: #d6d6d6
	}

	.log-btn .icons {
		margin-left: 30px;
		vertical-align: middle;
	}

	.log-btn .text {
		left: 95px;
		line-height: 50px;
		text-align: left;
		position: absolute;
	}

	.log-input {
		width: 370px;
		overflow: hidden;
		padding: 0 15px;
		font-size: 13px;
		border: 1px solid #EBEBEB;
		margin: 0 auto 15px;
		height: 48px;
		line-height: 48px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		-ms-border-radius: 5px;
		-o-border-radius: 5px;
		border-radius: 5px;
	}

	.log-input.warn {
		border: 1px solid #f88787
	}

	.select {
		padding-left: 80px;
	}

	@-webkit-keyframes cloud1 {
		0% {
			left: 200px
		}

		100% {
			left: -130px;
		}
	}

	@keyframes cloud1 {
		0% {
			left: 200px
		}

		100% {
			left: -130px;
		}
	}

	@-webkit-keyframes cloud2 {
		0% {
			left: 500px;
		}

		100% {
			left: -90px;
		}
	}

	@keyframes cloud2 {
		0% {
			left: 500px;
		}

		100% {
			left: -90px;
		}
	}

	@-webkit-keyframes cloud3 {
		0% {
			left: 620px;
		}

		100% {
			left: -70px;
		}
	}

	@keyframes cloud3 {
		0% {
			left: 620px;
		}

		100% {
			left: -70px;
		}
	}

	@-webkit-keyframes cloud4 {
		0% {
			left: 100px;
		}

		100% {
			left: -70px;
		}
	}

	@keyframes cloud4 {
		0% {
			left: 100px;
		}

		100% {
			left: -70px;
		}
	}
</style>
