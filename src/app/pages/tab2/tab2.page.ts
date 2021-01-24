import { Component, OnInit } from '@angular/core';
import { FlowerService } from 'src/app/services/flower-service/flower.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public flowers$;

  constructor(
    private flowerService: FlowerService,
  ) {}

  ngOnInit() {
    this.flowers$ = this.flowerService.getFlowers();
  }

}
