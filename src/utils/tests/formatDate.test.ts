import { formatDate } from "../formatDate";

describe("format date test", () => {
  const date = new Date("2015-03-25T10:31:00");
  const globalDate = date.getTime() / 1000;

  vi.useFakeTimers();
  vi.setSystemTime(date);

  test("formatDate should return 'a few second ago' if time was less then 30 second ago.", () => {
    expect(formatDate(globalDate - 29)).toBe("a few seconds ago");
    expect(formatDate(globalDate - 30)).not.toBe("a few seconds ago");
    expect(formatDate(globalDate)).toBe("a few seconds ago");
    expect(formatDate(globalDate + 29)).toBe("a few seconds ago");
    expect(formatDate(globalDate + 31)).toBe("a few seconds ago");
  });

  test("formatDate should return formated hour if time was more then 30 second ago but in the same day.", () => {
    expect(formatDate(globalDate - 30)).toBe("10:30");
    expect(formatDate(globalDate - 37800)).toBe("00:01");
    expect(formatDate(globalDate - 37801)).toBe("00:00");
    expect(formatDate(globalDate - 37859)).toBe("00:00");
  });

  test("formatDate should return formated date if time was from another day.", () => {
    expect(formatDate(globalDate - 37861)).toBe("24-03-2015");
    expect(formatDate(globalDate - 37861 - 86400)).toBe("23-03-2015");
  });
});
