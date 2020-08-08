import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { UploadService } from '../services/upload.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  filesToUpload: Array<File>=[];
  constructor(private uploadService: UploadService,
    private router: Router) { }
  
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  ngOnInit() {
  }
  /*additionalInfo= new FormGroup(
    {
      "_filename": new FormControl("")
    }
  )*/
  upload(){
    var formData = new FormData();
    var randomIDs = [];
    var files: Array<File> = this.filesToUpload;
    for(let i=0; i< files.length; i++){
      formData.append('uploads[]', files[i], files[i]['name']);
      var randomImageId = {
        "randomID": i*12546+200002
      }
      randomIDs.push(randomImageId);
    }
    console.log(randomIDs);
    formData.append('fileInformation', JSON.stringify(randomIDs));
    console.log(JSON.stringify(randomIDs))
    console.log(formData);
    this.uploadService.upload(formData)
    .subscribe((mes)=>{
      //console.log(mes);
      alert(files.length + ' file(s) successfully uploaded');
      this.router.navigate(['/display']);
    })
  }

  /*upload(){
    var formData = new FormData();
    
    var files: Array<File> = this.filesToUpload;
    for(let i=0; i< files.length; i++)
      formData.append('uploads[]', files[i], files[i]['name']);
    this.uploadService.upload(formData)
    .subscribe((files)=>{
      console.log(files);
      alert(files.length + ' file(s) successfully uploaded');
      this.router.navigate(['/display']);
    })
  }*/
}
