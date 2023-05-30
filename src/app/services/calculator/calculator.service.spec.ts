import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  
  it('should add two numbers', () => {
    const mockLoggerService = jasmine.createSpyObj('LoggerService',['log']);
    const calculatorService = new CalculatorService(mockLoggerService);
    let result = calculatorService.add(2,4);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
    expect(result).toBe(6);
  });
  
  
  it('should subtract two numbers', () => {
    const mockLoggerService = jasmine.createSpyObj('LoggerService',['log']);
    const calculatorService = new CalculatorService(mockLoggerService);
    let result = calculatorService.subtract(4,2);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
    expect(result).toBe(2);
  });

});
