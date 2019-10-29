import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import {Chart} from 'chart.js';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { DisplayedChart } from '../models/displayed-charts';
import { stringify } from 'querystring';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','./ButtonStyle.scss'],
})
export class DashboardComponent implements OnInit ,AfterViewInit {
  
  @ViewChild ('valueBarsCanvas',{static:false}) valueBarsCanvas: ElementRef;

  data: Observable<any[]>;
  size: number;

 public ref: AngularFireList<any>;
  months =[
    {value: 0, name:'January'},
    {value: 1, name:'February'},
    {value: 2, name:'March'},
    {value: 3, name:'April'},
    {value: 4, name:'Mai'},
  ];
  transaction ={
    value: 0,
    expense:false,
    month:0
  }
;

datatest ={

  type: 'doughnut',

  item:"Hello, I'm new",

    data: {

      labels: ["Label1", "Label2", "Label3", "Label4", "Label5"],

      datasets: [

        {

          label: "Label New chart",

          backgroundColor: ["#CF022B", "#F7A823","#7B7C7E","#007ac2","#E14B0F"],

          data: [247,526,73,384,433]

        }

      ]

    },

    options: {

      title: {

        display: false,

        text: 'New chart'

      },

      legend:{

        display:true,

        position:'bottom'},

      }

};

/*datatest= { type: 'bubble',

data: {

  labels: "User Story",

  datasets: [

    {

      label: ["US-170"],

      backgroundColor: "#f2a222",

      borderColor: "#f2a222",

      data: [{

        x: 21,

        y: 5.2,

        r: 15

      }]

    }, {

      label: ["US-189"],

      backgroundColor: "#f23022",

      borderColor: "#f23022",

      data: [{

        x:35,

        y: 7.5,

        r: 10

      }]

    }, {

      label: ["US-230"],

      backgroundColor: "#ac4fd1",

      borderColor: "#ac4fd1",

      data: [{

        x: 10,

        y: 3,

        r: 25

      }]

    }, 

    {

      label: ["US-236"],

      backgroundColor:"#2828b5",

      data: [{

        x: 17,

        y: 6,

        r: 40

      }]

    },

    {

      label: ["US-202"],

      backgroundColor: "#f23022",

      borderColor: "#f23022",

      data: [{

        x: 40,

        y: 2,

        r: 25

      }]

    },

    {

      label: ["US-195"],

      backgroundColor: "#7b777d",

      borderColor: "#7b777d",

      data: [{

        x: 45,

        y: 7,

        r: 5

      }]

    }

  ]

},

options: {

 

  legend: {

    position: "bottom",

  },

 

  title: {

    display: false,

    text: "Bubble chart",

  }, scales: {

    yAxes: [{ 

      scaleLabel: {

        display: true,

        labelString: "Risque"

      },

      ticks: {

        beginAtZero: true

    }

    }],

    xAxes: [{ 

      scaleLabel: {

        display: true,

        labelString: "Valeur"

      },

      ticks: {

        beginAtZero: true

    }

    }]

  }

}

};*/

/*datatest={

  type: 'radar',

  item:'"Hi, What's up?"',

data: {

  labels: ["UI/Display", "API-Connecteur", "API-Service", "Process", "Security"],

  datasets: [

    {

      label: "Sprint 14",

      pointBorderColor: "#f2a222",

      borderColor:"#f2a222",

      data: [10,7,3,8,6],

      fill: false,

    }, {

      label: "Sprint 15",

      pointBorderColor: "#f23022",

      borderColor:"#f23022",

      data: [12,6,4,9,4],

      fill: false,

    }

  ]

},

options: {

  title: {

    display: false,

    text: 'Population growth (millions)'

  },

  legend: {

    position: "bottom",

  }

}

};*/
// datatest ={
//   type: 'doughnut',
//   item:'init',
//     data: {
//       labels: ["Label1", "Label2", "Label3", "Label4", "Label5"],
//       datasets: [
//         {
//           label: "Label New chart",
//           backgroundColor: ["#CF022B", "#F7A823","#7B7C7E","#41738C","#E14B0F"],
//           data: [247,526,73,384,433]
//         }
//       ]
//     },
//     options: {
//       title: {
//         display: false,
//         text: 'New chart'
//       },
//       legend:{
//         display:true,
//         position:'bottom'},
//       }
// };

// ---------
public list:  DisplayedChart[]=[];
isDataAvailable:boolean = false;

  valueBarsChart: any;
  chartData = null;
  newdata:any;
  result:any;
  idfire: string;
  usertype = "Team Member";

  constructor( private db:AngularFireDatabase){
  }

 addSheet(){
  

  this.size=this.list.length + 1;
  //console.log("size is " + this.size);
  //console.log("ChartData[0] : " +this.chartData[1]);

  var idfireItem="TITRE "+this.size;
 // this.idfire = this.generateID(10);
  //this.datatest.item=idfireItem;
 this.newdata={
  type: 'doughnut',
  item: idfireItem,
    data: {
      labels: ["Label1", "Label2", "Label3", "Label4", "Label5"],
      datasets: [
        {
          label: "Label New chart",
          backgroundColor:["#CF022B", "#F7A823","#7B7C7E","#007ac2","#E14B0F"],
          data: [247,526,73,384,433]
        }
      ]
    },
    options: {
      title: {
        display: false,
        text: 'New chart'
      },
      legend:{
        display:true,
        position:'bottom'},
      }
};
var newPostRef = this.db.database.ref('transactions/' ).push(this.newdata);
  this.list.push(
    {
      firebaseUri: "aze",
      idFirefbase: newPostRef.key,
      title: "TITRE "+ this.size,
      type: "bar",
      data:this.newdata,
      labels:Object.keys(this.months).map(a => this.months[a].name),
    });
  
   // this.ref.update(this.idfire,this.newdata);
}

 generateID(length) {
  var result           = '';
  var characters       = 'AAAAAAA';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


public removeSheet(x){
 var index=this.list.findIndex(item => item.idFirefbase == x)
  console.log("REMOVE LOG: "+x);
  this.list.splice(index,1);
  this.db.database.ref('transactions/' + x ).remove();
  
}
// --------------
updateprof: Boolean = false;
updateprofil(){
    this.updateprof = this.updateprof ? false : true;
    if(this.updateprof){
    this.usertype="Manager";}else{
      this.usertype="Team Member";
    }
}
  
  
  updatefire(typ){
  this.ref.update("FireTest",{type: typ});
  }

  addFire(){
    var idfire: string;
    idfire="ID"+87;
    console.log("ADD FIRE"+this.datatest);
    this.ref.set(idfire,this.datatest);
    
    }


  ngAfterViewInit(){

    // this.db.database.ref('transactions').on('value', function(snapshot) {
    //   console.log("listenning");
    //   console.log(snapshot.val());

      
    //   var counter = 0;
    //   for(var listdata in snapshot.val()){

    //     console.log(snapshot.val()[listdata]);

    //     this.list.push(
    //       {
    //       firebaseUri: "aze",
    //       idFirefbase: snapshot.val()[listdata].item,
    //       title:snapshot.val()[listdata].item,
    //       type: "empty",
    //       data: snapshot.val()[listdata],
    //       labels:"Label "+ counter
    //     }
    //     );
    //     counter++;
      
    //   }
    // });

  //  this.ref = this.db.list('transactions', ref=> ref.orderByChild('month'));
    // this.db.database.ref('transactions').on('value',(snapchot)=>{

    //   var counter = 0;
    //   for(var listdata in snapchot.val()){

    //     //console.log(snapchot.val()[listdata]);

    //     this.list.push(
    //       {
    //       firebaseUri: "aze",
    //       idFirefbase: snapchot.val()[listdata].item,
    //       title:snapchot.val()[listdata].item,
    //       type: "empty",
    //       data: snapchot.val()[listdata],
    //       labels:"Label "+ counter
    //     }
    //     );
    //     counter++;
      
    //   }
    //   console.log(this.list);
    // });

  }

  ngOnInit() {
  this.db.database.ref('transactions').once('value', (snapchot)=>{

      var counter = 0;
    
      for(var listdata in snapchot.val()){
        this.list.push(
          {
          firebaseUri: "aze",
          idFirefbase: listdata,
          title:snapchot.val()[listdata].item,
          type: "empty",
          data: snapchot.val()[listdata],
          labels:"Label "+ counter
        
        }
        );
        counter++;
      }
    });

  }
  
// public updatelist(firelist){
//   console.log("firelist : "+firelist);
//    for(let chart in firelist){
//     console.log("CHart : "+firelist[chart]);
//     console.log("Result1 : "+this.result);
//     this.list.push(
//       {
//       firebaseUri: "aze",
//       idFirefbase: "aze"+this.size+"toto",
//       title: "Title "+ this.size,
//       type: "empty",
//       data: firelist[chart],
//       labels:"Label "+chart,

//     }
//     );
//    }
  
//    //this.list.push()

//  }



}
