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
  item:'init',
    data: {
      labels: ["Label1", "Label2", "Label3", "Label4", "Label5"],
      datasets: [
        {
          label: "Label New chart",
          backgroundColor: ["#CF022B", "#F7A823","#7B7C7E","#41738C","#E14B0F"],
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
  this.idfire = this.generateID(10);
  this.datatest.item=idfireItem;
 this.newdata=this.datatest;
var newPostRef = this.db.database.ref('transactions/' ).push(this.newdata);
  this.list.push(
    {
      firebaseUri: "aze",
      idFirefbase: newPostRef.key,
      title: "Title "+ this.size,
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
