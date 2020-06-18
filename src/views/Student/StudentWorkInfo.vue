<!--
 * @FileDescription: 学生就业信息界面
 * 布局：数据表
 * 功能：显示就业企业等信息
 * @Author: AA1HSHH
 * @Date: 2020.06.14 
 * @LastEditTime: 2020.06.16
 -->
<template>

     <v-container fluid tag="section">
		<el-table :data="tableData" style="width: 100%" height="600">
			<el-table-column prop="name" label="公告" width="500">
			</el-table-column>
			<el-table-column prop="local" label="工作地点" width="200">
			</el-table-column>
			<el-table-column prop="link" label="链接" width="400">
		
			</el-table-column>
		
			<el-table-column fixed="right" label="操作">
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
						移除
					</el-button>
					<el-button @click.native.prevent="gotolink(scope.$index, tableData)" type="text" size="small">
						查看
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div  style="width: 1000px;height:90px;"></div>
	 </v-container>

</template>

<script>
	export default {
		name: 'StudentWorkInfo',

		data() {
			return {
				tableData: [],
			}
		},
		created() {
			var self = this;
			this.$axios({
					method: 'get',
					url: 'http://192.168.43.105/data.php?action=get_work_info',
				})
				.then((response) => {
					self.tableData = response.data.data;
					console.log(response.data.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		methods: {
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},
			gotolink(index, rows) {
				console.log(this.tableData[index].link);
				//window.location.href = this.tableData[index].link;
				window.open(this.tableData[index].link);
			}
		}
	}
</script>

<style>
</style>
