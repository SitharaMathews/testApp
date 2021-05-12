import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPatients() {
    return this.httpClient.get(environment.queryURI + '/Patient',
      { headers: this.getHeaders() });
  }

  getAll() { //fetch based on DOB in 1965-1960 range
    return this.httpClient.get(environment.queryURI + '/Patient?_sort=-birthdate&birthdate=gt1960-01-01&birthdate=lt1965-12-31',
    { headers: this.getHeaders() });
  }

  patientListQuery(n,d){ //fetch based on name and DOB input field
    return this.httpClient.get(environment.queryURI + '/Patient?_sort=-birthdate&birthdate='+d+'&name='+n,
    { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/fhir+json'
    });
    return headers;
  }
}


