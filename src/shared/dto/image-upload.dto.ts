import { ApiProperty } from '@nestjs/swagger';

export class ImageUploadDto {
  @ApiProperty({
    example: {
      url: 'https://abc.com/images/eKYC/11/5/2023/d4227c37df5bbac7f89c23e058d7169a-80063.png',
    },
  })
  readonly response: {
    url: string;
  };
}
