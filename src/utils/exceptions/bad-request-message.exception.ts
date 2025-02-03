/* eslint-disable @typescript-eslint/no-explicit-any */

import { BadRequestException } from '@nestjs/common';

export class BadRequestMessageException extends BadRequestException {
  constructor(error: any) {
    super(typeof error === 'string' ? error : error?.message, 'Bad request');
  }
}
