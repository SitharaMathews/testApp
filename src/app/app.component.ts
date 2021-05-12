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

  getAllBetween(){ //data on DOB in 1965-1960 range
    this.loadingText = "";
    this.apiService.getAll().subscribe(
      response => {
        this.requestTime = new Date().getTime();
        this.patientData = response;
        this.patientEntry = this.patientData.entry;
        if(this.patientEntry == undefined){
          this.loadingText = "No Result Found";
        }
      }
    )
  }

  patientList(n,d){ //data based on name and DOB input field
    this.loadingText = "";
    if(n!="" && d!=""){
      this.name = n;
      this.dob = d;
      this.apiService.patientListQuery(this.name,this.dob).subscribe(
        response => {
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


