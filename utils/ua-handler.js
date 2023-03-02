/**
 * @file UA 解析器 / ES module
 * @module transforms/ua
 */

import Parser from 'ua-parser-js'

export const uaParser = (userAgent) => {
  const parser = new Parser()
  parser.setUA((userAgent || ''))
  const parseResult = parser.getResult()
  const browserName = String(parseResult.browser.name).toLowerCase()
  const isBrowser = (browsers) => {
    return browsers.some(browser => browser.toLowerCase() === browserName)
  }

  return {
    result: parseResult,
    isIE: isBrowser(['compatible', 'MSIE', 'IE']),
    isEdge: isBrowser(['Edge']),
    isFirefox: isBrowser(['Firefox']),
    isChrome: isBrowser(['Chrome', 'Chromium']),
    isSafari: isBrowser(['Safari']),
    isWechat: isBrowser(['Wechat']),
    isIos: parseResult.os.name === 'iOS',
    isAndroid: parseResult.os.name === 'Android',
    isMobile: parseResult.device.type === 'mobile',
  }
}

