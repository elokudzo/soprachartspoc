import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
public list: DisplayedChart[]=[];
  valueBarsChart: any;
  chartData = null;
  newdata:any;
  result:any;
  idfire: string;

  constructor( private db:AngularFireDatabase){}

 addSheet(){
  

  this.size=this.list.length + 1;
  console.log("size is " + this.size);
  //console.log("ChartData[0] : " +this.chartData[1]);

  this.idfire="TITRE "+this.size;
  this.datatest.item=this.idfire;
 this.newdata={
  type: 'doughnut',
  item:this.idfire,
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
 this.db.database.ref('transactions/'  + this.idfire ).set(this.newdata);
  this.list.push(
    {
      firebaseUri: "aze",
      idFirefbase: this.idfire,
      title: "Title "+ this.size,
      type: "bar",
      data:this.newdata,
      labels:Object.keys(this.months).map(a => this.months[a].name)
    });
    console.log(this.newdata);
  

   // this.ref.update(this.idfire,this.newdata);
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

    this.ref = this.db.list('transactions', ref=> ref.orderByChild('month'));
    this.db.database.ref('transactions').once('value').then((snapchot)=>{

      var counter = 0;
      for(var listdata in snapchot.val()){

        console.log(snapchot.val()[listdata]);

        this.list.push(
          {
          firebaseUri: "aze",
          idFirefbase: snapchot.val()[listdata].item,
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

  ngOnInit() {
  }
  
public updatelist(firelist){
  console.log("firelist : "+firelist);
   for(let chart in firelist){
    console.log("CHart : "+firelist[chart]);
    console.log("Result1 : "+this.result);
    this.list.push(
      {
      firebaseUri: "aze",
      idFirefbase: "aze"+this.size+"toto",
      title: "Title "+ this.size,
      type: "empty",
      data: firelist[chart],
      labels:"Label "+chart
    }
    );
   }
  
   //this.list.push()

 }



}
