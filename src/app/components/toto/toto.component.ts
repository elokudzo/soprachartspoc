import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DisplayedChart } from 'src/app/models/displayed-charts';
import { TotoService } from 'src/app/services/toto.service';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import {Chart} from 'chart.js';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CSVRecord } from './CSVModel';



@Component({
  selector: 'app-toto',
  templateUrl: './toto.component.html',
  styleUrls: ['./toto.component.css']
})


export class TotoComponent implements OnInit {
  
  public chartData:Chart.ChartConfiguration;
  myChart:Chart;
  mychartData= null;
  countries:any;
  population:any;
  title = 'Angular7-readCSV'; 
  public records: any[] = []; 

  @ViewChild('csvReader',{static:false}) csvReader: any;  

  constructor( private db:AngularFireDatabase) {}
  

  showMainContent: Boolean = false;
  ShowHideButton() {
    this.showMainContent = this.showMainContent ? false : true;

 }


  @Input() chart : DisplayedChart
  @Input() ref :AngularFireList<any>

  ngOnInit() {}
  
  name = 'Angular   6';
  canvas: any;
  ctx: any;
  
  @ViewChild('mychart',{static:false}) mychart;

  updateType(typ){
    this.ref = this.db.list('transactions', ref=> ref.orderByChild('month'));
    console.log("Update - OLD TYPE : "+ this.chart.type);
    console.log("Update - ID : "+ this.chart.idFirefbase);
    this.chart.type=typ;
    this.chart.data.type=typ;
    this.ref.update(this.chart.idFirefbase,{type: typ});
    console.log("NEW TYPE : "+this.chart.data.toString);

    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.myChart.destroy();
    //this.canvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.myChart= new Chart(this.ctx,this.chart.data);
    //this.ngAfterViewInit();  
  }

  /**
   * 
   * debut du code file upload a utiliser et modifier
   */

  uploadListener($event: any): void {  
  
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }  
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: CSVRecord = new CSVRecord();  
        csvRecord.id = curruntRecord[0].trim();  
        console.log(csvRecord.id);
        csvRecord.firstName = curruntRecord[1].trim();  
        csvRecord.lastName = curruntRecord[2].trim();  
        csvRecord.age = curruntRecord[3].trim();  
        csvRecord.position = curruntRecord[4].trim();  
        csvRecord.mobile = curruntRecord[5].trim();  
        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  
  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  } 
//end du code file upload


  //-------------------------------

  //--------------------------- 
  
  ngAfterViewInit() {


    

    this.chartData=this.chart.data;
    console.log("chart data is ");
    console.log(this.chartData.data.labels);

 this.countries = this.chartData.data.labels;
 this.population =  this.chartData.data.datasets[0].data;
 
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

   console.log("Chart Data ref : "+ this.chartData.type);

   this.myChart = new Chart(this.ctx, this.chartData);
    console.log("chart item " + this.chartData["item"]);

    
    /**
     * la partie commentee ci-dessous va servir a mettre a jour continuellement le chart suivant le changement
     * de la base de donnee firebase..pas encore terminee, a tester et essayer
     */
  //  this.ref = this.db.list('transactions', ref=> ref.orderByChild('item').equalTo(this.chartData["item"]));
 
  //  this.ref.valueChanges().subscribe(result => {
  //   console.log("result is ");
  //   console.log(result);
   

  //     this.mychartData = result[0].data;
  //     console.log("my chart data is");
  //       console.log(this.mychartData);
  //     this.myChart.data.datasets.forEach((dataset) => {
     
  //      dataset.data =  this.mychartData;
  //       console.log(dataset.data);
  //     });
    //  this.myChart.update();
    
   


//     this.mychart.update();
// console.log("0 is ");
// console.log(result[0].data);
// console.log("inside toto result is");
// console.log(result);

  //   this.mychartData = result;
    //  console.log("mycahartdata");
    //  console.log(this.mychartData);
    // this.mychartData = this.getUpdatedValues();

// this.mychart.data.datasets.forEach((dataset) => {
//   dataset.data = this.mychartData;
// });
// this.mychart.update();



 // });
    
  }

  

  getUpdatedValues() {
    // let reportByMonth = {
    //   0: null,
    //   1: null,
    //   2: null,
    //   3: null
    // };
    //LOG The JSON Stored in the First chartData level
    console.log("JSON IN CHART DATA TOTOOOOOOO : "+JSON.stringify(this.mychartData[0]));
    //---

    // for (let trans of this.mychartData) {
    //   if (reportByMonth[trans.month]) {
    //     if (trans.expense) {
    //       reportByMonth[trans.month] -= +trans.value;
    //     } else {
    //       reportByMonth[trans.month] += +trans.value;
    //     }
    //   } else {
    //     if (trans.expense) {
    //       reportByMonth[trans.month] = 0 - +trans.value;
    //     } else {
    //       reportByMonth[trans.month] = +trans.value;
    //     }
    //   }
    // }
//    return Object.keys(reportByMonth).map(a => reportByMonth[a]);
  }

  updateChartFirebase(typedata, position, value){
console.log("position is " + position);
var updatedValue = {};
updatedValue[position] = value;

if(typedata === "country"){
  this.myChart.data.labels[position] = value;
  this.db.database.ref('transactions/'+ this.chart.idFirefbase + "/data/labels" )
  .update(updatedValue);
}else if (typedata === "population"){
  this.myChart.data.datasets[0].data[position] = value;
  this.db.database.ref('transactions/'+ this.chart.idFirefbase + "/data/datasets/0/data" )
  .update(updatedValue);
}

this.myChart.update();
    

  }

}


 