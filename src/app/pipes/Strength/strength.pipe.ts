import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strength'
})
export class StrengthPipe implements PipeTransform {

  transform(value: number): string {
    if(value<10) {
      return `Weak`;
    }else if(value >= 10 && value < 20) {
      return 'Strong';
    }else {
      return 'Strongest';
    } 
  }

}
