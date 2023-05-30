import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  
  it('should add two numbers', () => {
    const calculatorService = new CalculatorService();
    let result = calculatorService.add(2,4);
    expect(result).toBe(6);
  });


  it('should subtract two numbers', () => {
    const calculatorService = new CalculatorService();
    let result = calculatorService.subtract(4,2);
    expect(result).toBe(2);
  });

});
