<!--
 * @FileDescription: 学生考研信息界面
 * 布局：数据表
 * 功能：查看考研院校信息
 * @Author: AA1HSHH
 * @Date: 2020.06.14 
 * @LastEditTime: 2020.06.16
 -->
<template>
	
		<v-container fluid tag="section">
		<el-table :data="tableData" style="width: 100%" height="600">
			<el-table-column prop="time" label="时间" width="200">
			</el-table-column>
			<el-table-column prop="title" label="标题" width="500">
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
		name: 'StudentStudyInfo',

		data() {
			return {
				tableData: [],
				
				headers: [
				          {
				            text: 'Dessert (100g serving)',
				            align: 'start',
				            sortable: false,
				            value: 'name',
				          },
				          { text: 'Calories', value: 'calories' },
				          { text: 'Fat (g)', value: 'fat' },
				          { text: 'Carbs (g)', value: 'carbs' },
				          { text: 'Protein (g)', value: 'protein' },
				          { text: 'Iron (%)', value: 'iron' },
				        ],
				        desserts: [
				          {
				            name: 'Frozen Yogurt',
				            calories: 159,
				            fat: 6.0,
				            carbs: 24,
				            protein: 4.0,
				            iron: '1%',
				          },
				          {
				            name: 'Ice cream sandwich',
				            calories: 237,
				            fat: 9.0,
				            carbs: 37,
				            protein: 4.3,
				            iron: '1%',
				          },
				          {
				            name: 'Eclair',
				            calories: 262,
				            fat: 16.0,
				            carbs: 23,
				            protein: 6.0,
				            iron: '7%',
				          },
				          {
				            name: 'Cupcake',
				            calories: 305,
				            fat: 3.7,
				            carbs: 67,
				            protein: 4.3,
				            iron: '8%',
				          },
				          {
				            name: 'Gingerbread',
				            calories: 356,
				            fat: 16.0,
				            carbs: 49,
				            protein: 3.9,
				            iron: '16%',
				          },
				          {
				            name: 'Jelly bean',
				            calories: 375,
				            fat: 0.0,
				            carbs: 94,
				            protein: 0.0,
				            iron: '0%',
				          },
				          {
				            name: 'Lollipop',
				            calories: 392,
				            fat: 0.2,
				            carbs: 98,
				            protein: 0,
				            iron: '2%',
				          },
				          {
				            name: 'Honeycomb',
				            calories: 408,
				            fat: 3.2,
				            carbs: 87,
				            protein: 6.5,
				            iron: '45%',
				          },
				          {
				            name: 'Donut',
				            calories: 452,
				            fat: 25.0,
				            carbs: 51,
				            protein: 4.9,
				            iron: '22%',
				          },
				          {
				            name: 'KitKat',
				            calories: 518,
				            fat: 26.0,
				            carbs: 65,
				            protein: 7,
				            iron: '6%',
				          },
				        ],
			}
		},
		created() {
			var self = this;
			this.$axios({
					method: 'get',
					url: 'http://192.168.43.105/data.php?action=get_study_info',
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
