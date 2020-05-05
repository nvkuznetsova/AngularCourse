import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderPipe implements PipeTransform {

  transform(data: Array<object>, field: string): Array<object> {
    if (!data || !field) {
      return data;
    }

    return data.slice().sort((dataA: object, dataB: object): number => {
      if (dataA[field] > dataB[field]) {
        return 1;
      }

      if (dataA[field] < dataB[field]) {
        return -1;
      }

      return 0;
    });
  }

}
