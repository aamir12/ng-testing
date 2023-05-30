import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {

  let calculatorService:CalculatorService;
  let mockLoggerService:any;
  beforeEach(()=> {
    mockLoggerService = jasmine.createSpyObj('LoggerService',['log']);
    calculatorService = new CalculatorService(mockLoggerService);
  })
  
  it('should add two numbers', () => {
    
    let result = calculatorService.add(2,4);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
    expect(result).toBe(6);
  });
  
  
  it('should subtract two numbers', () => {
    let result = calculatorService.subtract(4,2);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
    expect(result).toBe(2);
  });

});
