import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frequency'
})
export class FrequencyPipe implements PipeTransform {

  transform(value: any): unknown {
    if (value.freq === 1) {
      return `Codziennie o ${value.hour}.`
    }
    if (value.freq === 2) {
      return `co tydzień o ${value.hour}.`
    }
    return `W wybrane dni o ${value.hour}`;
  }

}
