import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(data: Array<object>, input: string, field = 'name'): Array<object> {
    if (!data || !input) {
      return data;
    }

    const formattedInput = input.toLowerCase();
    return data.filter((item: object) => String(item[field]).toLowerCase().includes(formattedInput));
  }

}
