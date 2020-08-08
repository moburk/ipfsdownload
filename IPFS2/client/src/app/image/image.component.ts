import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../services/image.service'
import { saveAs } from 'file-saver'
import { FileWHash } from '../models/filewhash.model';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  ifiles: FileWHash[];
  constructor(private http: HttpClient,
    private imageService: ImageService) { }
  ngOnInit() {
    this.dispImg();
  }
  dispImg(){
    this.imageService.dispImg().subscribe((files)=>{
        //console.log(hashes)
        
        this.ifiles = files;
      })
  }
  download(file: FileWHash){
      //console.log('in download function')
      saveAs(file.hash, file.filename)
  }

  deleteFile(file: FileWHash){
    this.imageService.deleteFile(file._id)
      .subscribe(()=> this.dispImg());
  }
}
