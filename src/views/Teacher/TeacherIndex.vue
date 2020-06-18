<!--
 * @FileDescription: 老师主界面
 * 功能：存储老师用户名、获取通知提醒信息
 * @Author: AA1HSHH
 * @Date: 2020.06.14 
 * @LastEditTime: 2020.06.16
 -->
<template>

 <v-app>
 	<NavBarTeacher/>
 	<v-main style="padding: 0 0 0 0;"  >	
 		<router-view></router-view>
 	</v-main>
 </v-app>



</template>

<script>
	import NavBarTeacher from '@/components/core/NavBarTeacher';
export default {
    name: 'TeacherIndex',
  components:{NavBarTeacher},
  data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        tableData: [],
        tabPosition: 'left',
        name:this.$route.params.acc,
        activeIndex: '1',
        activeIndex2: '1',
        timer: '',
      }
    },
    created() {


      console.log("tea_index_name:"+this.$route.params.acc);
      console.log(sessionStorage.getItem("teacname"));
        if (sessionStorage.getItem("teacname")=="undefined"||sessionStorage.getItem("teacname")==null) {
            sessionStorage.setItem("teacname", this.$route.params.acc);
            var name = sessionStorage.getItem("teacname");
            console.log("tea_store1:"+name);
        } else {
            var name2 = sessionStorage.getItem("teacname");
            console.log("tea_store2:"+name2);
            this.name = sessionStorage.getItem("teacname");
        }

    },
    mounted() {
      if(this.timer){
        clearInterval(this.timer);
      }else{
        this.timer = setInterval(()=>{
          this.myget();

        },900);
      }
    },
    methods: {
      
      myget() {
        //console.log("teacher get a notice");
        var self = this;
        this.$axios({
            method: 'post',
            url: 'http://192.168.43.105/data.php?action=get_teacher_notice',
            data:{
              sid:sessionStorage.getItem("teacname")
            }
        })
        .then((response) => {
                  self.tableData = response.data.data;
                  console.log(response.data.data);
				  console.log("notice new");
                  if(response.data.data.state=="0"){
					console.log("notice new ok");
                    var msg = new SpeechSynthesisUtterance("新消息");
                    msg.volume = 100 ;
                    window.speechSynthesis.speak(msg);
                    const h = self.$createElement;
                    this.$notify.info({
                              title: '',
                              message: h('i', { style: 'color: teal'}, response.data.data.content)
                            });
                  }

               })
        .catch((error) => {
            console.log(error);
        });
      }
    }
  }
</script>

<style>
.body-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #FFF;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

</style>
