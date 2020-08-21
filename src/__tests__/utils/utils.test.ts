import { isMobile, isTablet } from '../../utils/utils';

describe('utils', () => {
  describe('`isMobile` function', () => {
    const testCases: {
      testName: string
      expect: boolean
      agent: string
    }[] = [
      {
        testName: 'include `Android`',
        expect: true,
        agent: 'Mozilla/5.0 (Linux; U; Android 3.1; ja-jp; Sony Tablet S Build/THMAS10000)',
      }, {
        testName: 'include `Mobile`',
        expect: true,
        agent: 'AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
      }, {
        testName: 'include `iPhone`',
        expect: true,
        agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_1 like Mac OS X)',
      }, {
        testName: 'include `iPod`',
        expect: true,
        agent: 'Mozilla/5.0 (iPod; U; CPU OS 2_1 like Mac OS X; ja-jp)',
      }, {
        testName: 'does not include `Android`, `Mobile`, `iPhone`, `iPod`',
        expect: false,
        agent: 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; KDDI-TS01; Windows Phone 6.5.3.5)',
      },
    ];

    testCases.forEach((testCase) => {
      test(testCase.testName, () => {
        const result = isMobile(testCase.agent);
        expect(result).toBe(testCase.expect);
      });
    });
  });

  describe('`isTablet` function', () => {
    const testCases: {
      testName: string
      expect: boolean
      agent: string
    }[] = [
      {
        testName: 'include `Android`',
        expect: true,
        agent: 'Mozilla/5.0 (Linux; U; Android 3.1; ja-jp; Sony Tablet S Build/THMAS10000)',
      }, {
        testName: 'include `iPad`',
        expect: true,
        agent: 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko)',
      }, {
        testName: 'does not include `Android`, `iPad`',
        expect: false,
        agent: 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13',
      },
    ];

    testCases.forEach((testCase) => {
      test(testCase.testName, () => {
        const result = isTablet(testCase.agent);
        expect(result).toBe(testCase.expect);
      });
    });
  });
});
