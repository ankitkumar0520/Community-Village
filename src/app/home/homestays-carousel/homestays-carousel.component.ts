import { CommonModule } from '@angular/common';
import { Component, OnInit ,AfterViewInit,OnDestroy, inject} from '@angular/core';
import { getDynamicClass,initializeOwlCarousel,destroyOwlInstance } from '../../utils/utils';
import { RouterLink } from '@angular/router';
import { HomestaysService } from '../../../services/homestays.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-homestays-carousel',
  templateUrl: './homestays-carousel.component.html',
  styleUrls: ['./homestays-carousel.component.css'],
  imports:[CommonModule,RouterLink]
})
export class HomestaysCarouselComponent implements OnInit ,AfterViewInit,OnDestroy{

  private apiService = inject(ApiService)

  homestays:any=[];
  
  ngOnInit() {
    this.getHomestays();
  }

  ngAfterViewInit(): void {
      setTimeout(() => {
        initializeOwlCarousel('.homestays-carousel',true,true,5,false,[1,2,5]) 
      }, 500);
  }

  ngOnDestroy() {
    destroyOwlInstance('.homestays-carousel')
  }


getClass(input:number){
  return getDynamicClass(input);
}


 
getHomestays(): void {
  this.apiService.getData('website/homestays').subscribe({
    next: (data: any) => {
     
    this.homestays = data.map((homestay: any) => ({
      ...homestay, // Spread the existing properties
      image: 'https://placehold.co/600x400' // Add a placeholder image
    }));
  
    },
    error: (error:any) => {
      console.error('Error fetching Committies:', error);
      // Optionally, set a default value or handle the error
      this.homestays = []; // Fallback to an empty array
    },
    complete: () => {
      // Optional: Handle completion logic if needed
      console.log('Homestays fetch completed.');
    
    }
  });
}

}
