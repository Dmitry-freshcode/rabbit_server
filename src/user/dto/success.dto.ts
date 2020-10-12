import { ApiProperty } from '@nestjs/swagger';

/** success response */
export class SuccessDto {
  /** success status */
  @ApiProperty({
    format: 'boolean',
  })
  success: boolean;
}
