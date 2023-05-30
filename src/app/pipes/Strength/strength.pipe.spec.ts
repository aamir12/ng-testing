import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  it('create an instance', () => {
    const pipe = new StrengthPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return Weak',() => {
    const pipe = new StrengthPipe();
    expect(pipe.transform(8)).toBe('Weak');
  })

  it('should return Strong',() => {
    const pipe = new StrengthPipe();
    expect(pipe.transform(12)).toBe('Strong');
  })

  it('should return Strongest',() => {
    const pipe = new StrengthPipe();
    expect(pipe.transform(25)).toBe('Strongest');
  })
});
