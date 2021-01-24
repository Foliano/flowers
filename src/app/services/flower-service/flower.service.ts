import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {

  private flowers = [];

  constructor(private storageService: StorageService) {}

  public async getFlowers() {
    const flowers = await this.storageService.getItem('flowers');
    if(flowers) {
      this.flowers = [...flowers];
    }
    return this.flowers;
  }

  public async getFlowerById(id: string): Promise<any> {
    const flower = this.flowers.find((flower) => flower.id === id);
    return flower || null;
  }

  public saveFlowers(): void {
    this.storageService.setItem({ key: 'flowers', value: this.flowers});
  }

  public addFlower(flower) {
    this.flowers.push({...flower});
    this.saveFlowers();
  }
  
  public updateFlower(flowerUpd) {
    const flowerIndex = this.flowers.findIndex((flower) => flower.id === flowerUpd.id);
    this.flowers[flowerIndex] = { ...flowerUpd };
    this.saveFlowers();
  }

  public createId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
