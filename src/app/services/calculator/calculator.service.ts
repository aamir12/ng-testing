import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
 add(number1:number,number2:number) {
  let result =  number1 + number2;
  return result;

 }

 subtract(number1:number,number2:number) { 
  let result = number1 - number2;
  return result;
 }
}
