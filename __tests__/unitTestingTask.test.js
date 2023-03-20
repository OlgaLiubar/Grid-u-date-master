const unitTestingTask = require("../unitTestingTask");
const timezonedDate = require('timezoned-date');

describe('unitTestingTask', () => {
  const date = new Date("September 17, 1989 09:07:05:03");
  const UtcDate = timezonedDate.makeConstructor(0);

  test('it throws an error if format argument is not a string', () => {
    expect(unitTestingTask).toThrow("Argument `format` must be a string");
  });

  test('it throws an error if date argument is not an instance of Date or Unix Timestamp or ISODate String', () => {
    expect(() => {
      unitTestingTask('YYYY-MM-dd', null)
    }).toThrow('Argument `date` must be instance of Date or Unix Timestamp or ISODate String');
  });

  test('it returns the 4 digits of the year if the format string is "YYYY"', () => {
    const format = 'YYYY';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('1989');
  });

  test('it returns the last 2 digits of the year if the format string is "YY"', () => {
    const format = 'YY';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('89');
  });

  test('it returns full name of the month if the format string is "MMMM"', () => {
    const format = 'MMMM';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('September');
  });

  test('it returns short name of the month if the format string is "MMM"', () => {
    const format = 'MMM';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('Sep');
  });

  test('it returns ISO8601-compatible number of the month in year if the format string is "MM"', () => {
    const format = 'MM';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('09');
  });

  test('it returns the number of the month in year without zero-padding if the format string is "M"', () => {
    const format = 'M';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('9');
  });

  test('it returns the full name of the day if the format string is "DDD"', () => {
    const format = 'DDD';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('Sunday');
  });

  test('it returns the short name of the day if the format string is "DD"', () => {
    const format = 'DD';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('Sun');
  });

  test('it returns the two-letters name of the day if the format string is "D"', () => {
    const format = 'D';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('Su');
  });

  test('it returns zero-padded number of day in month if the format string is "dd"', () => {
    const format = 'dd';
    const date = new Date("September 7, 1989 09:07:21:20");
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('07');
  });

  test('it returns the number of the day in month if the format string is "d"', () => {
    const format = 'd';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('17');
  });

  test('it returns zero-padded hour in 24-hr format if the format string is "HH"', () => {
    const format = 'HH';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('09');
  });

  test('it returns the hour in 24-hr format if the format string is "H"', () => {
    const format = 'H';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('9');
  });

  test('it returns zero-padded hour in 12-hr format if the format string is "hh"', () => {
    const format = 'hh';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('09');
  });

  test('it returns the hour in 12-hr format if the format string is "h"', () => {
    const format = 'h';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('9');
  });

  test('it returns zero-padded minutes if the format string is "mm"', () => {
    const format = 'mm';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('07');
  });

  test('it returns the minutes if the format string is "m"', () => {
    const format = 'm';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('7');
  });

  test('it returns zero-padded seconds if the format string is "ss"', () => {
    const format = 'ss';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('05');
  });

  test('it returns the seconds if the format string is "s"', () => {
    const format = 's';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('5');
  });

  test('it returns zero-padded milliseconds if the format string is "ff"', () => {
    const format = 'ff';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('003');
  });

  test('it returns the milliseconds if the format string is "f"', () => {
    const format = 'f';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('3');
  });

  test('it returns AM/PM if format is A', () => {
    const format = 'A';
    const date = new Date('September 17, 1989 20:00:01:205');
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('PM');
  });
  
  test('it returns am/pm if format is a', () => {
    const format = 'a';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('am');
  });

  test('it returns time-zone in ISO8601-compatible basic format if format is ZZ', () => {
    const format = 'ZZ';
    const formattedDate = unitTestingTask(format, new UtcDate());
    expect(formattedDate).toBe('+0000');
  });
  
  test('it returns time-zone in ISO8601-compatible extended format if format is Z', () => {
    const format = 'Z';
    const formattedDate = unitTestingTask(format, new UtcDate());
    expect(formattedDate).toBe('+00:00');
  });
});

test('unitTestingTask.formatters returns a list of custom formats from predefined formatters storage', () => {
  unitTestingTask._formatters = {
    testFormat1: () => {},
    testFormat2: () => {}
  };
  const customFormats = unitTestingTask.formatters();
  expect(customFormats).toEqual(['testFormat1', 'testFormat2']);
});

test('unitTestingTask.register returns formatting function which formats date by calling unitTestingTask', () => {
  unitTestingTask._formatters = {
    YYYY: function () {
      return 'formatted date';
    }
  };
  const date = new Date();
  const formattingFunction = unitTestingTask.register('YYYY', 'YYYY-MM-dd');
  const formattedDate = formattingFunction(date);

  expect(formattedDate).toBe(unitTestingTask('YYYY-MM-dd', date));
});

test('unitTestingTask.noConflict returns unitTestingTask itself', () => {
  const result = unitTestingTask.noConflict();
  
  expect(result).toBe(unitTestingTask);
});

describe('unitTestingTask.lang function', () => {
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
    unitTestingTask._languages['testLanguage'] = {};
    const currentLanguage = unitTestingTask.lang('testLanguage');

    expect(currentLanguage).toEqual('testLanguage');
    expect(unitTestingTask._languages.current).toBe('testLanguage');
  });

  test('it sets current language to lang, adds it to languages storage and returns it if lang and options arguments are specified', () => {
    const currentLanguage = unitTestingTask.lang('test', {});

    expect(currentLanguage).toEqual('test');
    expect(unitTestingTask._languages.current).toBe('test');
  });
});
