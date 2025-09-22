import { FormatDatePipe } from './format-date.pipe';

describe('FormatDatePipe', () => {
  let pipe: FormatDatePipe;

  beforeEach(() => {
    pipe = new FormatDatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "Fecha no disponible" for null input', () => {
    expect(pipe.transform(null)).toBe('Fecha no disponible');
  });

  it('should return "Fecha inválida" for invalid date', () => {
    expect(pipe.transform('invalid-date')).toBe('Fecha inválida');
  });

  it('should return "Hace un momento" for very recent dates', () => {
    const now = new Date();
    expect(pipe.transform(now)).toBe('Hace un momento');
  });

  it('should return formatted date for old dates', () => {
    const oldDate = new Date('2023-01-01');
    const result = pipe.transform(oldDate);
    expect(result).toContain('enero');
    expect(result).toContain('2023');
  });
});