import { Injectable } from '@nestjs/common';
import parsePhoneNumber from 'libphonenumber-js';

@Injectable()
export class UtilsService {
  public decodeParseBase64Object(encodedObject: string): JsonWebKey | null {
    try {
      return JSON.parse(Buffer.from(encodedObject, 'base64').toString('ascii'));
    } catch (e) {
      return e.message;
    }
  }

  /**
   * Format phone number
   *
   * @param phoneNumber a valid phone number
   */
  formatPhoneNumber(phoneNumber: string) {
    return parsePhoneNumber(phoneNumber).format('E.164');
  }
  /**
   * Get Date as timestamp
   * @param d Date to get timestamp
   */
  public static getDateTimestamp(d: Date): number {
    return d.getTime();
  }

  public getValuesByKey(array: any[], key: string): any[] {
    const values = [];
    for (const item of array) {
      if (key in item) {
        values.push(item[key]);
      }
    }
    return values;
  }
}
