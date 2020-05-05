import { DurarionPipe } from './durarion.pipe';

describe('DurarionPipe', () => {
  const pipe = new DurarionPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format minutes in `hh h mm min`', () => {
    const minutes = 130;
    const output = '2 h 10 min';
    expect(pipe.transform(minutes)).toBe(output);
  });

  it('should format minutes in `mm min`', () => {
    const minutes = 50;
    const output = '50 min';
    expect(pipe.transform(minutes)).toBe(output);
  });
});
