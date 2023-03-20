const unitTestingTask = require("../unitTestingTask");
const timezonedDate = require('timezoned-date');

const date = new Date("September 17, 1989 09:07:05:03");
const UtcDate = timezonedDate.makeConstructor(0);

describe('unitTestingTask', () => {
  it.each([
      ['YYYY', date, '1989'],
      ['YY', date, '89'],
      ['MMMM', date, 'September'],
      ['MMM', date, 'Sep'],
      ['MM', date, '09'], // returns ISO8601-compatible number of the month
      ['M', date, '9'], // returns the number of the month in year without zero-padding
      ['DDD', date, 'Sunday'], //returns the full name of the day
      ['DD', date, 'Sun'], // returns the short name of the day
      ['D', date, 'Su'], // returns the two-letters name of the day
      ['dd', new Date("September 7, 1989 09:07:21:20"), '07'], //returns zero-padded number of day in month
      ['d', date, '17'], // returns the number of the day in month
      ['HH', date, '09'], // returns zero-padded hour in 24-hr format
      ['H', date, '9'], // returns the hour in 24-hr format
      ['hh', date, '09'], // returns the hour in 24-hr format
      ['h', date, '9'], // returns the hour in 12-hr format
      ['mm', date, '07'], // returns zero-padded minutes
      ['m', date, '7'], // returns minutes
      ['ss', date, '05'], // returns zero-padded seconds
      ['s', date, '5'], // returns seconds
      ['ff', date, '003'], // returns zero-padded milliseconds
      ['f', date, '3'], // returns milliseconds
      ['A', new Date("September 17, 1989 20:00:01:205"), 'PM'], // returns AM/PM
      ['a', date, 'am'], // returns am/pm
      ['ZZ', new UtcDate(), '+0000'], // returns time-zone in ISO8601-compatible basic format
      ['Z', new UtcDate(), '+00:00'], // returns time-zone in ISO8601-compatible basic format
  ])('it properly formats the date when passed format string %p and current date %p expecting %p', (format, date, result) => {
      expect(unitTestingTask(format, date)).toBe(result);
  });

  test('it throws an error if format argument is not a string', () => {
    expect(unitTestingTask).toThrow("Argument `format` must be a string");
  });

  test('it throws an error if date argument is not an instance of Date or Unix Timestamp or ISODate String', () => {
    expect(() => {
      unitTestingTask('YYYY-MM-dd', null)
    }).toThrow('Argument `date` must be instance of Date or Unix Timestamp or ISODate String');
  });

  test('unitTestingTask.formatters returns a list of custom formats from predefined formatters storage', () => {
    unitTestingTask.register('longDate', 'd MMMM');
    unitTestingTask.register('longDateAndTime', {
      'en': 'MMMM d, h:mma',
      'default': 'd MMMM, HH:mm'
    });
    const formatsList = unitTestingTask.formatters();
    expect(formatsList).toEqual(expect.arrayContaining(['longDate', 'longDateAndTime']));
  });
  
  test('unitTestingTask.register returns formatting function which formats date by calling unitTestingTask', () => {
    unitTestingTask.register('longDate', 'd MMMM');
    const formattedDate = unitTestingTask('longDate', date);
  
    expect(formattedDate).toBe('17 September');
  });
  
  test('unitTestingTask.noConflict returns unitTestingTask itself', () => {
    const result = unitTestingTask.noConflict();
    
    expect(result).toBe(unitTestingTask);
  });

  test('it returns current language if the lang argument is not specified', () => {
    const currentLanguage = unitTestingTask.lang();
    expect(currentLanguage).toEqual('en'); 
  });

  test('it returns current language if the options argument is not specified', () => {
    const currentLanguage = unitTestingTask.lang('es');
    expect(currentLanguage).toEqual('en'); 
  });

  test('it returns selected language if requiered module is availible', () => {
    const currentLanguage = unitTestingTask.lang('kk');
    expect(currentLanguage).toEqual('kk'); 
  });

  test('it sets current language to lang and returns it if options argument is not specified, but lang already exists in language storage', () => {
    //creates new language
    unitTestingTask.lang('testLanguage', {});
    const currentLanguage = unitTestingTask.lang('testLanguage');

    expect(currentLanguage).toEqual('testLanguage');
  });

  test('it sets current language to lang, adds it to languages storage and returns it if lang and options arguments are specified', () => {
    const currentLanguage = unitTestingTask.lang('testLanguage', {});

    expect(currentLanguage).toEqual('testLanguage');
  });
});
