import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
  upload(formData){
    return this.http.post(appConfig.url + 'api/upload', formData)
  }
}
