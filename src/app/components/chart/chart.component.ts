import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { DisplayedChart } from 'src/app/models/displayed-charts';
import { ChartService } from 'src/app/services/chart.service';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import {Chart} from 'chart.js';
import {AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { isString } from 'util';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})


export class ChartComponent implements OnInit {
  
  public chartData:Chart.ChartConfiguration;
  myChart:Chart;
  mychartData= null;
  countries:any;
  population:any;
  divWitdth:any;
  title = 'Angular7-readCSV'; 
  public records: any[] = []; 

  @ViewChild('csvReader',{static:true}) csvReader: any;


  constructor( private db:AngularFireDatabase, private ngZone: NgZone) {}
  

  showMainContent: Boolean = false;
  ShowHideButton() {
    this.showMainContent = this.showMainContent ? false : true;
    if(this.showMainContent){
      this.divWitdth=95;}else{
        this.divWitdth=45;
      }

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
    //this.chart.type=typ;
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
  
        let csvtitle = this.getHeaderArray(csvRecordsArray); 
      
        let csvValue = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, csvtitle.length);  

        this.countries = csvtitle;
        this.population = csvValue;
     
        console.log(this.countries);
        console.log(this.population);
    
        var self = this;
        this.countries.forEach(function (value, i) {
          
          self.updateChartFirebase("country", i, value)

      });

      this.population.forEach(function (value, i) {
        self.updateChartFirebase("population", i, value)

    });
    this.fileReset($event);  
        // for(var i = 0;i< this.countries.length;i++){
        //   this.updateChartFirebase("country", i, this.countries[i])
        // }

        // for(var j = 0;j< this.population.length;j++){
        //   this.updateChartFirebase("population", j, this.population[j])
        // }
        
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset($event);  
    }  
 
  }  
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      
      return curruntRecord;
      // if (curruntRecord.length == headerLength) {  
      //   let csvRecord = [];
      //   csvRecord[i] = curruntRecord[0].trim();  
      //   csvRecord.firstName = curruntRecord[1].trim();  
      //   csvRecord.lastName = curruntRecord[2].trim();  
      //   csvRecord.age = curruntRecord[3].trim();  
      //   csvRecord.position = curruntRecord[4].trim();  
      //   csvArr.push(csvRecord);  
      // }  
    }  
 //   return csvArr;  
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
  
  fileReset(event) { 
    event.srcElement.value = null; 

  } 
  
  ngAfterViewInit() {

    console.log("ngAfterViewIntit Runed !!! ");

 this.chartData=this.chart.data;

 this.countries = this.chartData.data.labels;
 this.population =  this.chartData.data.datasets[0].data;
 
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

 
   this.myChart = new Chart(this.ctx, this.chartData);
var self = this;
    this.db.database.ref('transactions/'+ this.chart.idFirefbase ).on('child_changed',function(snapshot){

    
      self.ngZone.run(() => {

        if(isString(snapshot.val())){
          self.chart.title = snapshot.val();
         // console.log("self.chart.title = snapshot.val(); runned  here");
        }
        else {
          self.myChart.data.labels = snapshot.val().labels;
          self.myChart.data.datasets[0].data = snapshot.val().datasets[0].data;
          self.myChart.update();         
          self.countries =  snapshot.val().labels;
        self.population =  snapshot.val().datasets[0].data;
        }
      
      });

    });
  
    
  }


  getUpdatedValues() {
    console.log("JSON IN CHART DATA TOTOOOOOOO : "+JSON.stringify(this.mychartData[0]));
  
  }

  updateChartFirebase(typedata, position, value){

var updatedValue = {};
updatedValue[position] = value;

if(typedata === "country"){
  this.myChart.data.labels[position] = value;
 this.db.database.ref('transactions/'+ this.chart.idFirefbase + "/data/labels" ).update(updatedValue);
}else if (typedata === "population"){
  this.myChart.data.datasets[0].data[position] = value;
 this.db.database.ref('transactions/'+ this.chart.idFirefbase + "/data/datasets/0/data" ).update(updatedValue);
}

this.myChart.update();
  }


  updateTitleFirebase(titlefire){
    var updatedValue = {};
updatedValue["item"] = titlefire;

this.db.database.ref('transactions/'+ this.chart.idFirefbase)
.update(updatedValue);
    console.log("title fire is " + titlefire);
  }

}


 