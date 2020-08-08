import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { appConfig } from '../app.config';
import { Hash } from '../models/hash.model'
import { FileWHash } from '../models/filewhash.model'


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }
  
  sendHash(hash: Hash){
    console.log(hash);
    return this.http.post<Hash>(appConfig.url + 'api/getFile', hash);
  }
  dispImg(){
    return this.http.get<FileWHash[]>(appConfig.url + 'api/returnFiles');
  }

  deleteFile(_id: String){
    console.log(_id);
    return this.http.delete(appConfig.url+'api/'+ _id);
  }
}
