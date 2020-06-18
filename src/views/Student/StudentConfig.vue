<!--
 * @FileDescription: 学生信息修改界面
 * 布局：步骤条
 * 功能：实现逐步修改学生信息
 * @Author: AA1HSHH
 * @Date: 2020.06.14 
 * @LastEditTime: 2020.06.16
 -->

<template>

	<v-container style="" fluid tag="section">

		<v-stepper v-model="e6" vertical>
			<v-stepper-step step="1" :complete="e6>1">
				选择变更状态
			</v-stepper-step>

			<v-stepper-content step="1">
				<v-card color="blue-grey lighten-5" height="200px">
					<v-card-title>状态选择</v-card-title>
					<v-card-text>
						<div>
							<el-radio v-model="radio" label="1">工作</el-radio>
							<el-radio v-model="radio" label="2">考研</el-radio>
							<el-radio v-model="radio" label="3">找工作中</el-radio>
							<el-radio v-model="radio" label="4">自主创业</el-radio>

						</div>

					</v-card-text>

				</v-card>
				<v-col cols="4" sm="6" offset-sm="3">
					<v-btn color="primary" @click="statuscheck" :disabled="radio==0">下一步</v-btn>
				</v-col>



			</v-stepper-content>

			<v-stepper-step :complete="e6>2 &&radio==1" step="2">
				提交就业信息
			</v-stepper-step>

			<v-stepper-content step="2">
				<v-card color="blue-grey lighten-5" height="500px">
					<v-card-title>信息提交表</v-card-title>
					<v-card-text>
						<el-form ref="form" :model="form" label-width="80px" :disabled="radio!=1 ? true : false">
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
					</v-card-text>

				</v-card>

				<v-col cols="4" sm="6" offset-sm="3">
					<v-btn class="mx-2" :disabled="this.form.region == ''|| this.form.name==''" color="primary" @click="e6 = 3">下一步</v-btn>

					<v-btn class="mx-2" color="primary" @click="e6 = 1">上一步</v-btn>
				</v-col>
			</v-stepper-content>

			<v-stepper-step :complete="e6>3 &&radio==1 " step="3">
				上传三方合约
			</v-stepper-step>

			<v-stepper-content step="3">
				<v-card color="blue-grey lighten-5" height="200px">
					<v-card-title>上传就业文件</v-card-title>
					<v-card-actions>

						<input type="file" id="file" ref="file" />
						<v-btn @click='uploadFile'>
							<span>上传</span>
							<v-icon>mdi-cloud-upload</v-icon>
						</v-btn>


					</v-card-actions>
				</v-card>

				<v-col cols="4" sm="6" offset-sm="3">
					<v-btn class="mx-2" color="primary" @click="e6 = 4">下一步</v-btn>
					<v-btn class="mx-2" color="primary" @click="e6 = 2">上一步</v-btn>
				</v-col>

			</v-stepper-content>

			<v-stepper-step :complete="clickornot" step="4">
				完成
			</v-stepper-step>
			<v-stepper-content step="4">
				<v-col cols="4" sm="6" offset-sm="3">
					<v-btn class="mx-2" color="primary" @click="onSubmit">提交修改</v-btn>
					<v-btn class="mx-2" color="primary" @click="laststatuscheck">上一步</v-btn>
				</v-col>
			</v-stepper-content>
		</v-stepper>

	</v-container>

</template>

<script>
	export default {
		name: 'StudentConfig',
		data() {
			return {
				e6: 1,
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
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

				sitTable: ['工作', '考研', '找工作', '自主创业'],
				clickornot: false,




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
					'银行金融业'
				],
				active: 0,
				radio: 0,
				file: "",





			}
		},
		methods: {
			next() {
				if (this.active++ > 2)
					this.active = 0;
			},
			previous() {
				if (this.active >= 0)
					this.active--;
				//this.active = 0;
			},

			onSubmit() {
				console.log("submit!");
				this.$data.clickornot = true;
				var self = this;
				this.$axios({
						method: 'post',
						url: 'http://192.168.43.105/data.php?action=change_student_info',
						data: {
							sid: sessionStorage.getItem("stuname"),
							situation: self.radio - 1,
							cname: self.form.name,
							c_industry: self.form.region,
							emp_date: self.form.date,
							occup: self.form.occup,
							qual: self.form.resource,
							salary: self.form.salary,
						}
					})
					.then((response) => {
						
						console.log(response.data);
						if (response.data.data == "true")
							self.$message({
								showClose: true,
								message: '上传成功',
								type: 'success'
							});
					})
					.catch((error) => {
						console.log(error);
					});
			},



			statuscheck() {
				if (this.radio != 1) this.e6 = 4;
				else
					this.e6++;
			},
			laststatuscheck() {
				this.$data.clickornot = false;
				if (this.radio != 1) this.e6 = 1;
				else
					this.e6--;
			},
			uploadFile: function() {
				var self = this;
				this.$axios({
					method: 'post',
					url: 'http://192.168.43.105/data.php?action=upload_file_sid',
					data: {
						sid: sessionStorage.getItem("stuname"),
					},

				}).then((response) => {
					console.log("send sid");
				}).catch((error) => {
					console.log(error);
				});


				this.file = this.$refs.file.files[0];
				let formData = new FormData();
				formData.append('file', this.file);

				this.$axios.post('http://192.168.43.105/data.php?action=upload_file', formData, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					})
					.then(function(response) {
						console.log("getresponse:" + response.data);
						if (response.data != 1 && response.data != '1') {
							self.$message({
								showClose: true,
								message: '上传失败',
								type: 'error'
							});
						} else {
							self.$message({
								showClose: true,
								message: '上传成功',
								type: 'success'
							});
						}

					})
					.catch(function(error) {
						console.log(error);
					});

			},


		}
	}
</script>

<style>

</style>
