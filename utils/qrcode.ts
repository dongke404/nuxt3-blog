import type { QRCodeToDataURLOptions } from 'qrcode'
import QRCode from 'qrcode'

export async function renderTextToQRCodeDataURL(value: string, options?: QRCodeToDataURLOptions) {
  return await QRCode.toDataURL(value, {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    width: 260,
    ...options,
  })
}

