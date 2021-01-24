import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { CameraService } from 'src/app/services/camera/camera.service';
import { FlowerService } from 'src/app/services/flower-service/flower.service';
import { RoomsService } from 'src/app/services/rooms-service/rooms.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
const { LocalNotifications } = Plugins;

@Component({
  providers: [CameraService],
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild('form') form: NgForm;

  public days = [
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
    'Niedziela',
  ];

  public repeatNotification = [
    {
      label: 'day',
      value: 1,
    },
    {
      label: 'week',
      value: 1,
    },
    {
      label: 'day',
      value: 1,
    },
  ];

  public now = new Date().toISOString();

  public flower = {
    id: null,
    name: '',
    room: null,
    picture: {
      format: null,
      data: null
    },
    freq: 1,
    days: [],
    hour: this.now
  }; 

  public rooms$;

  public edit = false;

  constructor(
    private roomsService: RoomsService,
    private cameraService: CameraService,
    private route: ActivatedRoute,
    private flowerService: FlowerService,
    private utilsService: UtilsService,
    private router: Router,
  ) {}
  
  ionViewWillEnter() {
    this.edit = this.route.snapshot.data.edit;
    if (!this.edit) {
      this.flower.id = this.flowerService.createId();
    } else {
      this.getById();
    }
    this.rooms$ = this.roomsService.getRooms();
  }

  private async getById(): Promise<void> {
    const id = this.route.snapshot.params.id;
    const flower = await this.flowerService.getFlowerById(id);
    if(flower) {
      this.flower = {...flower};
    }
  }

  public async addPhoto(): Promise<void> {
    const cameraData = await this.cameraService.takePicture()
    const { base64String: data, format } = cameraData;
    this.flower.picture = {
      data,
      format
    }
  }

  public save(): void {
    if (this.form.status === 'INVALID') {
      this.utilsService.presentAlert({ message: 'Wypełnij wymagane pola!'} );
      return;
    }
    if(this.edit) {
      this.flowerService.updateFlower(this.flower);
      this.utilsService.presentAlert({
        message: `${this.flower.name} został edytowany!`
      })
    } else {
      this.flowerService.addFlower(this.flower);
      this.utilsService.presentAlert({
        message: 'Dodano kwiatka!'
      })
    }
    LocalNotifications.schedule({
      notifications: [
        {
          title: `${this.flower.name} - ${this.flower.room}`,
          body: `Podlej go!`,
          id: null,
          schedule: {
            at: new Date((new Date()).setHours(new Date(this.flower.hour).getHours(), new Date(this.flower.hour).getMinutes())),
          },
          extra: { flowerId: this.flower.id },
        }
      ]
    });
    this.form.reset();
    this.router.navigateByUrl('/tabs/flowers');
  }

}
