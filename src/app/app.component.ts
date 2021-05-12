import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app/services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'fhir-app-test';
  patientData:any;
  patientEntry:any;
  patientId:any;
  pId:any;
  requestTime:any;
  headers = ["ID","FAMILY NAME", "NAME", "GENDER", "RESOURCE TYPE", "BIRTH DATE"];
  name:string;
  dob:any;
  loadingText:string;
  loading:boolean;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.loadingText = "";
    this.apiService.getPatients().subscribe(
      data => {
        console.log(data);
        this.requestTime = new Date().getTime();
        this.patientData = data;
        this.patientEntry = this.patientData.entry;
        if(this.patientEntry == undefined){
          this.loadingText = "No Result Found";
        }
      }
    )
  }

  //data on DOB in 1965-1960 range,prevent multiple btn click until response received
  getAllBetween(){ 
    this.loadingText = "";
    this.loading = true;
    this.apiService.getAll().subscribe(
      response => {
        this.loading = false;
        this.requestTime = new Date().getTime();
        this.patientData = response;
        this.patientEntry = this.patientData.entry;
        if(this.patientEntry == undefined){
          this.loadingText = "No Result Found";
        }
      }
    )
  }
  
  //data based on name and DOB input field,prevent multiple btn click until response received
  patientList(n,d){ 
    this.loadingText = "";
    if(n!="" && d!=""){
      this.loading = true;
      this.name = n;
      this.dob = d;
      this.apiService.patientListQuery(this.name,this.dob).subscribe(
        response => {
          this.loading = false;
          this.requestTime = new Date().getTime();
          this.patientData = response;
          this.patientEntry = this.patientData.entry;
          if(this.patientEntry == undefined){
            this.loadingText = "No Result Found";
          }
        }
      )
    }
    
  }

}


