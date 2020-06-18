<!--
 * @FileDescription: 老师简略信息界面
 * 布局：概况信息，三张echarts数据表
 * 功能：显示该老师管理学生的就业率、就业行业等信息
 * @Author: AA1HSHH
 * @Date: 2020.06.14 
 * @LastEditTime: 2020.06.16
 -->
<template>
	 <v-container tag="section" fluid>
		 <v-card style="padding:1;">
			 
			 <v-img height="260px" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
			 <v-card-title style="color: #FFFFFF;font-size:25px">学生概况</v-card-title>
			 <v-card-text >
			 				<v-row>
			 					
								<v-spacer />
			 						<v-card
			 						   
			 						   color="yellow accent-3"
			 						   dark
			 						   width="150"
			 						 >
			 						   <v-card-title>
			 						     <v-icon
			 						       large
			 						       left
			 						     >
			 						       mdi-briefcase-variant
			 						     </v-icon>
			 						     <span class="title font-weight-light">就业&创业比率</span>
			 						   </v-card-title>
			 							 
			 						   <v-card-text class="headline font-weight-bold">
			 						    
			 							<v-row>
			 								{{this.workrate}}
			 														<v-icon large>mdi-percent</v-icon>
			 							</v-row>
			 						   </v-card-text>
			 						  </v-card>
									  <v-spacer />
			 						  
			 						  <v-card
			 						     
			 						     color="light-green accent-3"
			 						     dark
			 						     width="150"
			 						   >
			 						     <v-card-title>
			 						       <v-icon
			 						         large
			 						         left
			 						       >
			 						         mdi-school
			 						       </v-icon>
			 						       <span class="title font-weight-light">考研比例</span>
			 						     </v-card-title>
			 						  	 
			 						     <v-card-text class="headline font-weight-bold">
			 								 <v-row>
			 								 	{{this.postrate}}
			 									<v-icon large>mdi-percent</v-icon>
			 								 </v-row>
			 						       
			 						     </v-card-text>
			 						  </v-card>
			 						  
									  <v-spacer />
			 						  <v-card
			 						     
			 						     color="deep-orange"
			 						     dark
			 						     width="150"
			 						   >
			 						     <v-card-title>
			 						       <v-icon
			 						         large
			 						         left
			 						       >
			 						        mdi-bell-alert
			 						       </v-icon>
			 						       <span class="title font-weight-light">找工作比例</span>
			 						     </v-card-title>
			 						  	 
			 						     <v-card-text class="headline font-weight-bold">
			 								 <v-row>
			 								 	 {{this.otherate}}
			 								 							<v-icon large>mdi-percent</v-icon>
			 								 </v-row>
			 						      
			 						     </v-card-text>
			 						  </v-card>
			 						
			 						<v-spacer /> 
			 				</v-row> 
							
			 				 
			 </v-card-text>
			 </v-img>
			 
		 	
		 </v-card>
		 <v-divider></v-divider>
		
	<div>
		<v-card>
			<v-card-title style="color: #000000;font-size:25px">详细图表</v-card-title>
			<v-card-media>
				<v-row>
					<v-col cols="4" sm="6" offset-sm="3">
						<div id="rate" style="width: 500px;height:400px;"></div>
					</v-col>
						
					<v-col cols="4" sm="6" offset-sm="3">
						<div id="indus" style="width: 500px;height:400px;"></div>
					</v-col>
						
					<v-col cols="12" sm="6" offset-sm="1">
						<div id="recent" style="margin-left: 1px;width: 900px;height:400px;"></div>
					</v-col>
						
					
				
					
				</v-row>
			</v-card-media>
			
		</v-card>
		<v-divider></v-divider>
		
	
	
	
	<div  style="width: 1000px;height:80px;"></div>	
	</div>  			
	 </v-container>
</template>

<script>
  export default{
    name: 'TeacherInfo',

      data() {
        return {
		  itmes:[
		  ],
		  workrate:0,
		  postrate:0,
		  otherate:0,
		  entreprate:0,
		  total:0,
          briefinfo:[],
          finalinfo:[],
          indusinfo:[],
          finalindusinfo:[],
          recentinfo:[],
          finalrecentinfo:[],
          time:[],
 }
},
      created() {
        var self = this;
		this.$axios({
		    method: 'post',
		    url: 'http://192.168.43.105/data.php?action=get_recent_data',
		    data:{
		      sid:sessionStorage.getItem("teacname"),
		    }
		})
		.then((response) => {
		          self.recentinfo = response.data.data;
		          console.log("recent:"+response.data.data);
              console.log("recent!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		          self.show_recent_chart();
		       })
		.catch((error) => {
		    console.log(error);
		});
		
       	this.$axios({
        	    method: 'post',
        	    url: 'http://192.168.43.105/data.php?action=get_teacher_info_rate',
        	    data:{
        	      sid:sessionStorage.getItem("teacname"),
        	    }
        	})
        	.then((response) => {
        	          self.briefinfo = response.data.data;

        	          console.log("rate:"+response.data.data);
                    self.show_rate_chart();
        	       })
        	.catch((error) => {
        	    console.log(error);
        	});
          this.$axios({
              method: 'post',
              url: 'http://192.168.43.105/data.php?action=get_teacher_info_indus',
              data:{
                sid:sessionStorage.getItem("teacname"),
              }
          })
          .then((response) => {
                    //self.briefinfo = response.data.data;
                    self.indusinfo = response.data.data;
                    console.log("indus:"+response.data.data);
                    self.show_indus_chart();
                 })
          .catch((error) => {
              console.log(error);
          });
          },
      methods:{
        deleteRow(index, rows) {
                rows.splice(index, 1);
              },
        gotolink(index, rows){
             console.log(this.tableData[index].link);
             //window.location.href = this.tableData[index].link;
             window.open(this.tableData[index].link);
        },


        show_recent_chart(){
         //样例数据{"id":"11","rc_time":"2020-06-14 16:08:39","depart":"物联网学院","emp_num":"1","unemp_num":"2","postgra_num":"3","state":"0"}
         var self = this;
         var i=0;
         var j=0;
         var num = 0;
         if(self.recentinfo.length>7)  num = 6;
         else num = self.recentinfo.length;
         var em=[];
         var unem=[];
         var post=[];
         for(j=num;j>-1;j--){
          em.push(self.recentinfo[j].emp_num);
          unem.push(self.recentinfo[j].unemp_num);
          post.push(self.recentinfo[j].postgra_num);
          self.time.push(self.recentinfo[j].rc_time)
         }
         for (i = 0; i < 3; i++) {
             var obj=new Object();
             obj.type='line';
             //obj.stack='总量';
             if(i==0){obj.name='就业&创业';obj.data=em}
             if(i==1){obj.name='找工作';obj.data=unem}
             if(i==2){obj.name='考研';obj.data=post}
             self.finalrecentinfo.push(obj);
             console.log("finalrecentinfo:"+self.finalrecentinfo[i]);
             //console.log("finalindus:"+i+"name:"+self.finalrecentinfo[i].situation+"value:"+self.finalrecentinfo[i].value);
          }
          var echarts = require('echarts');
          var myChart = this.$echarts.init(document.getElementById('recent'));
          var option = {
             title: {
                 text: '毕业生状态变化情况'
             },
             tooltip: {
                 trigger: 'axis'
             },
             legend: {
                 data: ['就业&创业', '找工作', '考研']
             },
             grid: {
                 left: '3%',
                 right: '4%',
                 bottom: '3%',
                 containLabel: true
             },
             toolbox: {
                 feature: {
                     saveAsImage: {}
                 }
             },
             xAxis: {
                 type: 'category',
                 boundaryGap: false,
                 data: this.time
             },
             yAxis: {
                 type: 'value'
             },
             series: this.finalrecentinfo
         };

          myChart.setOption(option);

        },

        show_indus_chart(){
          var self = this;
          var i=0;
          for (i = 0; i < self.indusinfo.length; i++) {
              var obj=new Object();
              obj.name=self.indusinfo[i].cindustry;
              obj.value=self.indusinfo[i].cnum;
              this.finalindusinfo.push(obj);
              console.log("finalindus:"+i+"name:"+self.finalindusinfo[i].situation+"value:"+self.finalindusinfo[i].value);
           }

             var echarts = require('echarts');

             var myChart = this.$echarts.init(document.getElementById('indus'));
             // 绘制图表
             myChart.setOption({
                  title: {
                         text: '就业行业',
                         subtext: '',
                         left: 'center'
                     },
                     tooltip: {
                         trigger: 'item',
                         formatter: '{a} <br/>{b} : {c} ({d}%)'
                     },
                     legend: {
                         left: 'center',
                         top: 'bottom',
                         data: []
                     },
                     toolbox: {
                         show: true,
                         feature: {
                             mark: {show: true},
                             dataView: {show: true, readOnly: false},
                             magicType: {
                                 show: true,
                                 type: ['pie', 'funnel']
                             },
                             restore: {show: true},
                             saveAsImage: {show: true}
                         }
                     },
                     series: [
                         {
                             name: '',
                             type: 'pie',
                             radius: [30, 110],
                             center: ['50%', '50%'],
                             data: this.finalindusinfo
                         }
                     ]
             });
        },
        show_rate_chart(){
          var self = this;
          var i=0;
          for (i = 0; i < self.briefinfo.length; i++) {
              console.log("forloop"+self.briefinfo[i].situation);
              if(self.briefinfo[i].situation=="0")  {self.briefinfo[i].situation="就业";this.workrate=parseInt(self.briefinfo[i].value)}
              if(self.briefinfo[i].situation=="1")  {self.briefinfo[i].situation="考研";this.postrate=parseInt(self.briefinfo[i].value)}
              if(self.briefinfo[i].situation=="2")  {self.briefinfo[i].situation="找工作";this.otherate=parseInt(self.briefinfo[i].value)}
              if(self.briefinfo[i].situation=="3")  {self.briefinfo[i].situation="创业";this.entreprate=parseInt(self.briefinfo[i].value)}
              var obj=new Object();
              obj.name=self.briefinfo[i].situation;
              obj.value=self.briefinfo[i].value;
              this.finalinfo.push(obj);
			  this.total += parseInt(self.briefinfo[i].value);
              console.log("final:"+i+"name:"+self.finalinfo[i].situation+"value:"+self.finalinfo[i].value);
           }
		  this.workrate=((this.workrate+this.entreprate)/this.total)*100;
		  this.workrate = this.workrate.toFixed(2);
		  this.postrate=(this.postrate/this.total)*100;
		  this.postrate = this.postrate.toFixed(2);
		  this.otherate=(this.otherate/this.total)*100;
		  this.otherate = this.otherate.toFixed(2);
          console.log("total:"+this.total+":work:"+this.workrate);
          var echarts = require('echarts');

          // 基于准备好的dom，初始化echarts实例
          var myChart = this.$echarts.init(document.getElementById('rate'));
          // 绘制图表
          myChart.setOption({
               title: {
                      text: '就业率',
                      subtext: '',
                      left: 'center'
                  },
                  tooltip: {
                      trigger: 'item',
                      formatter: '{a} <br/>{b} : {c} ({d}%)'
                  },
                  legend: {
                      left: 'center',
                      top: 'bottom',
                      data: ['考研', '找工作', '就业', '创业']
                  },
                  toolbox: {
                      show: true,
                      feature: {
                          mark: {show: true},
                          dataView: {show: true, readOnly: false},
                          magicType: {
                              show: true,
                              type: ['pie', 'funnel']
                          },
                          restore: {show: true},
                          saveAsImage: {show: true}
                      }
                  },
                  series: [

                      {
                          name: '',
                          type: 'pie',
                          radius: [30, 110],
                          center: ['50%', '50%'],
                          roseType: 'area',
                          data: this.finalinfo
                      }
                  ]
          });
        },

      }
    }
</script>

<style>

</style>
