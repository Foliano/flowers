import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  public async openBlank(urlArg: string): Promise<void> {
    await Browser.open({
      url: urlArg,
      windowName: '_blank',
      presentationStyle: 'fullscreen'
    });
  }
}
