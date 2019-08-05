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
  /*public list: DisplayedChart[] = [
    {
      firebaseUri: "toto",
      idFirefbase: "LhRlYKAnPQBZydo4WXB",
      title: "Title 1",
      type:"bar",
      data: [360, 400, 23],
      labels:["toto","tit","lili"]
    },
    {
      firebaseUri: "titi",
      idFirefbase: "LhRl_oWtOH2cbOGWodm",
      title: "Title 2",
      type:'doughnut',
      data: [320, 500, 230],
      labels:["toto","tit","lili"]
    }
  ];*/
  valueBarsChart: any;
  chartData = null;
  newdata:any;
  result:any;
  idfire: string;

  constructor( private db:AngularFireDatabase){}

 addSheet(){
  

  this.size=this.list.length;
  //console.log("ChartData[0] : " +this.chartData[1]);

  this.idfire="IDFIRE: "+this.size;
  this.datatest.item=this.idfire;
 this.newdata=this.datatest;
  console.log("IDFIRE: "+this.size);
  this.list.push(
    {
      firebaseUri: "aze",
      idFirefbase: this.idfire,
      title: "Title "+ this.size,
      type: "bar",
      data:this.newdata,
      labels:Object.keys(this.months).map(a => this.months[a].name)
    });
    
    this.ref.update(this.idfire,this.newdata);
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

    /**
     * code ci-dessous a utilsiser pour eviter de faire un subscribe sur le dashboard mais plutot sur
     * seulement le toto component vu qu'on veut subscribe seulement aux changements de chaque totocomponent
     * a modifier si besoin
     */
    // var newRef = this.db.database.ref('transactions');
    // var self = this;
    // newRef.on('value',function(data){
    
    //  var dataArray = [];
    //   for(var key in data.val()){
       
    //    dataArray.push( data.val()[key]);

    //   }
    //   self.result=dataArray;
    //   for(let chart in dataArray){
     
    //     self.list.push(
    //       {
    //       firebaseUri: "aze",
    //       idFirefbase: dataArray[chart].item,
    //       title: "Title Init "+ chart,
    //       type: "empty",
    //       data: dataArray[chart],
    //       labels:"Label "+ chart
    //     }
    //     );
    //    }
       
    // });

    this.ref.valueChanges().subscribe(result=> {


   
      if(this.chartData){
        console.log("inside update");
     
        this.updateCharts(result);
      } 
      else{

        console.log("inside create");
        console.log(result);
        console.log("Result 1: "+JSON.stringify(result[1]));
       // this.createCharts(result);
       console.log("great");
       console.log(result);
        
        this.result=result;

        for(let chart in result){
          console.log("CHart : "+this.result[chart].item);
          console.log("Result1 : "+this.result);
          this.list.push(
            {
            firebaseUri: "aze",
            idFirefbase: this.result[chart].item,
            title: "Title Init "+ chart,
            type: "empty",
            data: this.result[chart],
            labels:"Label "+ chart
          }
          );
         }

      }
    });

    
  }
  /*
  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];
  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }
  constructor() { }
*/
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

  getReportValues() {
    let reportByMonth = {
      0: null,
      1: null,
      2: null,
      3: null
    };
    //LOG The JSON Stored in the First chartData level
    console.log("JSON IN CHART DATA : "+JSON.stringify(this.chartData[0]));
    //---

    for (let trans of this.chartData) {
      if (reportByMonth[trans.month]) {
        if (trans.expense) {
          reportByMonth[trans.month] -= +trans.value;
        } else {
          reportByMonth[trans.month] += +trans.value;
        }
      } else {
        if (trans.expense) {
          reportByMonth[trans.month] = 0 - +trans.value;
        } else {
          reportByMonth[trans.month] = +trans.value;
        }
      }
    }
    return Object.keys(reportByMonth).map(a => reportByMonth[a]);
  }

  createCharts(data){


    this.chartData = data;
 
  // Calculate Values for the Chart
  let chartData = this.getReportValues();

  // Create the chart

  this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
    type: 'bar',
    data: {
      labels: Object.keys(this.months).map(a => this.months[a].name),
      datasets: [{
        data: chartData,
        backgroundColor: '#32db64'
      }]
    },
    options: {
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItems, data) {
            return data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] +' $';
          }
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        yAxes: [{
          ticks: {
            callback: function (value, index, values) {
              return value + '$';
            },
            suggestedMin: 0
          }
        }]
      },
    }
  });

  }


  updateCharts(data){
 this.chartData = data;
  let chartData = this.getReportValues();
 
  // Update our dataset
  this.valueBarsChart.data.datasets.forEach((dataset) => {
    dataset.data = chartData
  });
  this.valueBarsChart.update();
  }
  
  addTransaction() {
    this.ref.push(this.transaction).then(() => {
      this.transaction = {
        value: 0,
        month: 0,
        expense: false
      };
     
    })
}

}
