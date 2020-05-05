import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durarion',
})
export class DurarionPipe implements PipeTransform {

  transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours} h ${mins} min` : `${mins} min`;
  }

}
