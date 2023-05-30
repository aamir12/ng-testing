import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private loggerService:LoggerService) {}
  
 add(number1:number,number2:number) {
  let result =  number1 + number2;
  this.loggerService.log(`Add action is preformed with result ${result}`);
  return result;
  
}

subtract(number1:number,number2:number) { 
  let result = number1 - number2;
  this.loggerService.log(`Subtract action is preformed with result ${result}`);
  return result;
 }
}
