<!--
测试界面
-->
<template>
  <v-card>
        <v-card-title>
          Nutrition
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-data-table
           v-model="selected"
          :headers="headers"
          :items="items"
          :search="search" 
          @click:row="handleClick"
        >
          
          <template v-slot:item.action="{ item }">
                              <v-btn color="success" @click="getfile(item)" :loading="item.createloading" :disabled="item.createloading">getfile</v-btn>
                              <!-- <v-btn color="error" @click="excludeRequest(item)" :loading="item.cancelloading" :disabled="item.cancelloading">Cancel</v-btn>     -->
                          </template>
        </v-data-table>
      </v-card>
	
 
</template>
<script>
	export default {
	  name: 'About',
	  
	  
	  
	   methods: {
	      showAlert(a){
	        if (event.target.classList.contains('btn__content')) return;
	        alert('Alert! \n' + a.name);
	      },
		  handleClick(value) {
		      alert("hello"+value.name);
		  },
	    },
	    data () {
	      return {
	        selected:[],
	        search: '',
	        headers: [
	          {
	            text: 'Dessert (100g serving)',
	            align: 'left',
	            sortable: false,
	            value: 'name'
	          },
	          { text: 'Calories', value: 'calories' },
	          { text: 'Fat (g)', value: 'fat' },
	          { text: 'Carbs (g)', value: 'carbs' },
	          { text: 'Protein (g)', value: 'protein' },
	          { text: 'Iron (%)', value: 'iron' },
			  { text: 'Actions', value: 'action', sortable: false, align: 'center'},
	        ],
	        items: [
	          {
	            value: false,
	            name: 'Frozen Yogurt',
	            calories: 159,
	            fat: 6.0,
	            carbs: 24,
	            protein: 4.0,
	            iron: '1%'
	          },
	          {
	            value: false,
	            name: 'Ice cream sandwich',
	            calories: 237,
	            fat: 9.0,
	            carbs: 37,
	            protein: 4.3,
	            iron: '1%'
	          },
	          {
	            value: false,
	            name: 'Eclair',
	            calories: 262,
	            fat: 16.0,
	            carbs: 23,
	            protein: 6.0,
	            iron: '7%'
	          },
	          {
	            value: false,
	            name: 'Cupcake',
	            calories: 305,
	            fat: 3.7,
	            carbs: 67,
	            protein: 4.3,
	            iron: '8%'
	          },
	          {
	            value: false,
	            name: 'Gingerbread',
	            calories: 356,
	            fat: 16.0,
	            carbs: 49,
	            protein: 3.9,
	            iron: '16%'
	          },
	          {
	            value: false,
	            name: 'Jelly bean',
	            calories: 375,
	            fat: 0.0,
	            carbs: 94,
	            protein: 0.0,
	            iron: '0%'
	          },
	          {
	            value: false,
	            name: 'Lollipop',
	            calories: 392,
	            fat: 0.2,
	            carbs: 98,
	            protein: 0,
	            iron: '2%'
	          },
	          {
	            value: false,
	            name: 'Honeycomb',
	            calories: 408,
	            fat: 3.2,
	            carbs: 87,
	            protein: 6.5,
	            iron: '45%'
	          },
	          {
	            value: false,
	            name: 'Donut',
	            calories: 452,
	            fat: 25.0,
	            carbs: 51,
	            protein: 4.9,
	            iron: '22%'
	          },
	          {
	            value: false,
	            name: 'KitKat',
	            calories: 518,
	            fat: 26.0,
	            carbs: 65,
	            protein: 7,
	            iron: '6%'
	          }
	        ]
	      }
	    }
		}

</script>