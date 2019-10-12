import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import {Chart} from 'chart.js';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { DisplayedChart } from '../models/displayed-charts';
import { stringify } from 'querystring';


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
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
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

  constructor( private db:AngularFireDatabase){
  }

 addSheet(){
  

  this.size=this.list.length + 1;
  //console.log("size is " + this.size);
  //console.log("ChartData[0] : " +this.chartData[1]);

  var idfireItem="TITRE "+this.size;
  this.idfire = this.generateID(10);
  this.datatest.item=idfireItem;
 this.newdata={
  type: 'doughnut',
  item: idfireItem,
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
};
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
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
  this.ref.remove(x);
}
// --------------
  
  
  
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
