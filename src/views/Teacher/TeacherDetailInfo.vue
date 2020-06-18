<!--
 * @FileName: TeacherDeatilInfo.vue
 * @FileDescription: 老师详细信息界面
 * 界面：数据表
 * 功能：详细信息加载当前界面中老师所管理学生的全部信息、是就业的同学可以下载就业信息表
 * @Author: AA1HSHH
 * @Date: 2020.06.14 
 * @LastEditTime: 2020.06.16
 -->

<template>

	<div>

		<v-container tag="section" fluid>
			<v-card>
				<v-card-title>
					详细信息
					<v-spacer></v-spacer>
					<v-text-field v-model="search" append-icon="mdi-magnify" label="搜索" single-line hide-details></v-text-field>
				</v-card-title>
				 
					  
				
				<v-data-table
				                    
						v-model="selected"
				        :headers="headers"
				        :items="info"
				        :search="search" 
						class="elevation-1"
						loading="true"
						locale="zh-CN"
						 
						no-data-text="暂无数据"
						no-results-text="没有搜索结果"
						loading-text="数据加载当中..."
				                    
				      >
					  <!-- @click:row="handleClick" -->
				<template v-slot:item.action="{ item }" >
				    <v-btn color="success" @click="getfile(item)" :loading="item.createloading" :disabled="item.situation!='就业'">获取文件
					<v-icon>mdi-download</v-icon>
					</v-btn>                    
				</template>
				
				</v-data-table>
			</v-card>
			
			<div style="width: 1000px;height:120px;"></div>
		</v-container>


	</div>
</template>

<script>
	export default {
		name: 'TeacherDetailInfo',

		data() {
			return {
				
                select:'',
				search: '',
				selected:[],
				headers: [{
						text: '姓名',
						align: 'start',
						sortable: false,
						value: 'sname',
					},
					{
						text: '学号',
						value: 'sid'
					},
					{
						text: '目前状态',
						value: 'situation'
					},
					{
						text: '公司名称',
						value: 'cname'
					},
					{
						text: '岗位',
						value: 'occup'
					},
					{
						text: '薪水',
						value: 'salary'
					},
					{ text: '下载文件', 
					value: 'action', 
					sortable: false, 
					align: 'center'},
					
					
				],
			    info:[ ],


			}
		},
		mounted() {
			var self = this;
			this.$axios({
					method: 'post',
					url: 'http://192.168.43.105/data.php?action=get_teacher_detailinfo',
					data: {
						sid: sessionStorage.getItem("teacname"),
						
					}
				})
				.then((response) => {
					self.info = response.data.data;
					this.change_situation();
					console.log(response.data.data);
				})
				.catch((error) => {
					console.log(error);
				});

		},
		methods: {
			/*样例数据{"sid":"B170704",
			"cname":"万达影视",
			"cindustry":"娱乐业",
			"empdate":"2015-03-07",
			"occup":"摄影师",
			"qual":"专科生",
			"salary":"4000",
			"sname":"李sir",
			"teleph":"15928855230",
			"status":"1",
			"situation":"3",
			"depart":"物联网学院",
			"major":"网络工程",
			"class":null,
			"score":"111"}*/
			getfile(item){
				
				console.log("getsid："+item.sid);
				this.get_student_file(item.sid);
			},
			handleClick(value) {
			    //alert("hello"+value.sid);
			},
			 get_student_file(insid){
			
			                  var geturl='http://192.168.43.105/';
			                  
			                  var self =this;
			                  this.$axios({
			                    method:'post',
			                    url:'http://192.168.43.105/data.php?action=download_file_name',
			                    data:{
			                      sid : insid,
			                    },
			
			                  }).then((response)=>{
			                    
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
			                    		message: '该学生没有上传文件',
			                    		type: 'warning'
			                    	});
			                    }
			                  }).catch((error)=>{
			                    console.log(error);
								self.$message({
									showClose: true,
									message: '该学生没有上传文件',
									type: 'warning'
								});
			                  });
			
			
			 /* */
			},
            change_situation:function(){
				var i=0;
				for(i=0;i<this.info.length;i++){
				if(this.info[i].situation=="0") this.info[i].situation="就业";
				if(this.info[i].situation=="1") this.info[i].situation="考研";
				if(this.info[i].situation=="2") this.info[i].situation="找工作";
				if(this.info[i].situation=="3") this.info[i].situation="创业";
				}
			},
			showhello:function(){
				console.log("press!");
				this.$message({
					showClose: true,
					message: 'hello',
					type: 'error'
				});
			}
		}
	}
</script>

<style>
	.v-sheet--offset {
		top: -24px;
		position: relative;
	}
</style>
