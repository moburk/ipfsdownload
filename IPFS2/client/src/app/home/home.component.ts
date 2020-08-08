import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { ImageService } from '../services/image.service'
import { Router } from '@angular/router'
import { Hash } from '../models/hash.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private imageService: ImageService,
    private router: Router) { }
  imgData= new FormGroup(
    {
      "hash": new FormControl(""),
      "filename": new FormControl("")
    }
  )
  ngOnInit() {
  }
  sendImgData(hash: Hash){
    this.imageService.sendHash(hash).subscribe((data)=>{
      this.router.navigate(['/image']);
    }),
    error => console.log(error);
  }

}
