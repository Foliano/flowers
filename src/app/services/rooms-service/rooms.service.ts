import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  
  private rooms = [
    'kuchnia',
    'salon',
    'sypialnia',
    'przedpokój',
    'balkon'
  ];

  private loaded = false;

  constructor(private storageService: StorageService) {}

  public async getRooms(): Promise<string[]> {
    if(this.loaded) {
      return this.rooms;
    }
    const rooms = await this.storageService.getItem('rooms');
    if (rooms && Array.isArray(rooms)) {
      this.rooms = rooms;
    }
    this.loaded = true;
    return this.rooms;
  }

  public updateRooms(room: string, index = -1): void {
    if(index >= 0) {
      this.rooms.splice(index, 1);
    } else {
      this.rooms.push(room);
    }
    this.storageService.setItem({ key: 'rooms', value: this.rooms });
  }

  public createId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
