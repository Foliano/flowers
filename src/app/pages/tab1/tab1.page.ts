import { Component } from '@angular/core';
import { FlowerService } from 'src/app/services/flower-service/flower.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public flowers$


  constructor(
    private flowerService: FlowerService,
  ) {}

  ionViewWillEnter() {
    this.flowers$ = this.flowerService.getFlowers();
  }

}
