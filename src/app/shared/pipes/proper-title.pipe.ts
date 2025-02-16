import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'properTitle',
  standalone: true
})
export class ProperTitlePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    return value.split(' ').map(word => {
      if (word.indexOf('.') !== -1) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  }

}
