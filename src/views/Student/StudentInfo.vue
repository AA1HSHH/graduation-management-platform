<!--
 * @FileDescription: 学生我的信息界面
 * 布局：三个卡片分别展示学生基础信息、班级信息、就业信息
 * 功能：显示学生信息
 * @Author: AA1HSHH
 * @Date: 2020.06.14 
 * @LastEditTime: 2020.06.16
 -->
<template>
	


    <!-- <div style="width: 1000px;height:100px;"></div> -->
	<v-container style=""  fluid
    tag="section">
		
		<!-- <v-col cols="1" sm="6" offset-sm="2" >
         <v-btn color="primary" @click="onSubmit" >提交修改</v-btn>
          <v-divider

               inset
               vertical
             ></v-divider>

         <v-btn color="primary"  @click="laststatuscheck">上一步</v-btn>
       </v-col> -->
		<!-- <v-icon>mdi-account</v-icon> -->
		<v-divider vertical ></v-divider>
		
			<v-card   v-if="tableData.sname!=null||tableData.sname!=undefined" >
				
				<v-card-title style="color: #3E2723 ;">基本信息</v-card-title>
				
				<v-card-text >
					<v-row>
						<v-col cols="10" sm="6">
							<!--  -->
							<v-text-field auto-grow outlined v-model="tableData.sname" label="姓名" readonly shaped></v-text-field>
							<v-text-field v-model="tableData.sid" label="学号" readonly></v-text-field>
							<v-text-field v-model="tableData.teleph" label="电话" readonly></v-text-field>

							<v-row>

							</v-row>


						</v-col>

						<!-- <span style="margin: auto;">
               <img src="../../assets/user.png"/>
               </span> -->


					</v-row>

				</v-card-text>
				
			</v-card>

			<!-- <v-divider></v-divider>
        <v-subheader></v-subheader> -->
			<v-divider vertical></v-divider>

			<v-card v-if="tableData.major!=null||tableData.major!=undefined">
				<v-card-title style="color: #311B92;">院系信息</v-card-title>
				<v-card-text>
					<v-row>
						<v-col cols="12" sm="6">
							<v-text-field v-model="tableData.depart" label="学院" readonly></v-text-field>
							<v-text-field v-model="tableData.major" label="专业" readonly></v-text-field>





						</v-col>

						


					</v-row>

				</v-card-text>
			</v-card>


		



		

            <v-divider vertical ></v-divider>
		<v-card v-if="tableData.situation==0">
			
			<v-card-title style="color: #006064;">就业信息表</v-card-title>
			<v-card-actions>
				<v-row>
					<v-col cols="12" sm="3">
				<v-text-field v-model="tableData.cname" label="公司" readonly shaped></v-text-field>
					</v-col>
					<v-col cols="12" sm="3">
						<v-text-field v-model="tableData.occup" label="岗位" readonly></v-text-field>
					</v-col>
					<v-col cols="12" sm="3">
						<v-text-field v-model="tableData.salary" label="薪水" readonly></v-text-field>
					</v-col>
					
					<v-btn  color="indigo" @click='getfile' >
						下载合同
					<v-icon>mdi-archive-arrow-down</v-icon>
					</v-btn>	
					</v-row>
					
					
			</v-card-actions>
		</v-card>

		<!--
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
         class: "1"
        depart: "物联网学院"
        major: "网络工程"
        score: "131"
        sid: (...)
        situation: (...)
        sname: (...)
        status: (...)
        teleph: (...)
    <v-spacer></v-spacer>
    <v-divider></v-divider>
          <v-text-field

            v-model="tableData.sname"
            label="姓名"
            readonly
            shaped
          ></v-text-field>
          <v-text-field
            v-model="tableData.sid"
            label="学号"
            readonly
          ></v-text-field>
          <v-text-field
            v-model="tableData.major"
            label="专业"
            readonly
          ></v-text-field>
          <v-text-field
            readonly
            v-model="tableData.situation"
            label="状态"
          ></v-text-field>

        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-sheet
            elevation="12"
            class="pa-12"
          >
            <v-text-field
              v-model="model"
              :label="label"
              :hint="hint"
              :placeholder="placeholder"
              :shaped="shaped"
              :outlined="outlined"
              :rounded="rounded"
              :solo="solo"
              :single-line="singleLine"
              :filled="filled"
              :clearable="clearable"
              :persistent-hint="persistentHint"
              :loading="loading"
              :flat="flat"
              :counter="counterEn ? counter : false"
              :dense="dense"
            ></v-text-field>
            <div class="mt-12 text-center">
              Value: {{ model }}
            </div>
          </v-sheet>
        </v-col>
      </v-row>-->
	  <div  style="width: 1000px;height:100px;"></div>
	</v-container>
	<!-- <div  style="width: 1000px;height:200px;"></div> -->
</template>



<script>
	export default {
		name: 'StudentInfo',
		data() {
			return {
				//testname:'dbj',
				tableData: [],
				model: 'I\'m a text field',
				label: 'Hey!',
				hint: 'Customize me!',
				placeholder: '',
				shaped: false,
				outlined: false,
				rounded: false,
				solo: false,
				singleLine: false,
				filled: false,
				clearable: false,
				persistentHint: false,
				loading: false,
				flat: false,
				counterEn: false,
				counter: 0,
				dense: false,
				file:''

			}
		},
		created() {
			console.log("info_name:" + sessionStorage.getItem("name"));
			var self = this;
			this.$axios({
					method: 'post',
					url: 'http://192.168.43.105/data.php?action=get_student_info',
					data: {
						sid : sessionStorage.getItem("stuname"),
						//sid: ,
					}
				})
				.then((response) => {
					self.tableData = response.data.data;
					console.log("hello:");
					console.log(self.tableData);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		methods:{
			getfile:function(){
			 /* this.$axios({
			                      url: 'api/doc.pdf',
			                      method: 'post',
			                      responseType: 'blob',
			                  }).then((response) => {
			                       var fileURL = window.URL.createObjectURL(new Blob([response.data]));
			                       var fileLink = document.createElement('a');
			
			                       fileLink.href = fileURL;
			                       fileLink.setAttribute('download', 'file.doc');
			                       document.body.appendChild(fileLink);
			
			                       fileLink.click();
			                  });*/
			                  var geturl='http://192.168.43.105/';
			                  
			                  var self =this;
			                  this.$axios({
			                    method:'post',
			                    url:'http://192.168.43.105/data.php?action=download_file_name',
			                    data:{
			                      sid : sessionStorage.getItem("stuname"),
			                    },
			
			                  }).then((response)=>{
			                    //geturl.push('hi');
								console.log(response.data.data.file_name);
								if(response.data.data.file_name!=''){
									geturl=geturl+response.data.data.file_name;
									self.file=response.data.data.file_name;
									console.log("get file");
									console.log(geturl);
									this.$axios({
									                     url: geturl,
									                     method: 'GET',
									                     responseType: 'blob',
									                 }).then((response) => {
									                      var fileURL = window.URL.createObjectURL(new Blob([response.data]));
									                      var fileLink = document.createElement('a');
												
									                      fileLink.href = fileURL;
									                      fileLink.setAttribute('download', self.file);
									                      document.body.appendChild(fileLink);
												
									                      fileLink.click();
									                 });
								}else{
									self.$message({
										showClose: true,
										message: '没有上传文件',
										type: 'warning'
									});
								}
			                    
			                  }).catch((error)=>{
			                    console.log(error);
								self.$message({
									showClose: true,
									message: '没有上传文件',
									type: 'warning'
								});
			                  });
			
			
			 /* */
			},
		}
	}
</script>

<style>
</style>
