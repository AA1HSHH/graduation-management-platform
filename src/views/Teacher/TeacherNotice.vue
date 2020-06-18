<!--
 * @FileDescription: 老师通知信息界面
 * 布局：一张数据表
 * 功能：显示老师收到所有通知信息
 * @Author: AA1HSHH
 * @Date: 2020.06.14 
 * @LastEditTime: 2020.06.16
 -->
<template>
  <div>
    <v-container tag="section" fluid>
      <v-card>
        <v-card-title>
          通知信息
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="搜索"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
           :items="desserts"
          :search="search"
          class="elevation-1"

          loading-text="Loading... Please wait"
        ></v-data-table>
        <!--  -->
      </v-card>
	  <div  style="width: 1000px;height:80px;"></div>
    </v-container>

  </div>
</template>

<script>
  export default{
    name: 'TeacherNotice',

      data() {
        return {
                search: '',
                headers: [
                  {
                    text: '时间',
                    align: 'start',
                    sortable: false,
                    value: 'cur_time',
                  },
                  { text: '类型', value: 'kind' },
                  { text: '内容', value: 'content' },
                ],
                desserts: [
                ],

        }
      },
      //get_teacher_allnotice
      mounted() {
        var self = this;
        	this.$axios({
        	    method: 'post',
        	    url: 'http://192.168.43.105/data.php?action=get_teacher_allnotice',
        	    data:{
        	      sid:sessionStorage.getItem("teacname"),
        	    }
        	})
        	.then((response) => {
        	        
                   self.desserts=response.data.data;
        	          console.log(response.data.data);
                    self.showchart();
        	       })
        	.catch((error) => {
        	    console.log(error);
        	});
      },
      methods:{

      }
    }
</script>

<style>
</style>
