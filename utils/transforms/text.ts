/**
 * @file Text transformer
 * @module transform.text
 */

export const escape = _Escape
export const unescape = _Unescape
export const padStart = _PadStart
export const textOverflow = _Truncate
export const firstUpperCase = _Capitalize

export function numberToKilo(count: number): string {
  return count > 1000 ? `${parseFloat((count / 1000).toFixed(2))}k` : String(count)
}

export function numberSplit(number: number): string {
  return String(number).replace(/.{1,3}(?=(.{3})+$)/g, '$&,')
}

const CHINESE_NUMBER_TEXT = '〇一二三四五六七八九十'.split('')
const CHINESE_NUMBER_CAPITAL_TEXT = '零壹贰叁肆伍陆柒捌玖拾'.split('')
export const numberToChinese = (text: string | number, capital = false) => {
  const targetText = capital ? CHINESE_NUMBER_CAPITAL_TEXT : CHINESE_NUMBER_TEXT
  return String(text)
    .split('')
    .map(number => targetText[Number(number)])
    .join('')
}

