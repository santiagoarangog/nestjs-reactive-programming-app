import { ApiProperty } from '@nestjs/swagger';

class DependencyStatusDto {
    @ApiProperty({ example: 'up', description: "El estado del servicio, puede ser 'up' o 'down'." })
    status: 'up' | 'down';
}

export class HealthStatusDto {
    @ApiProperty({ type: DependencyStatusDto })
    database: DependencyStatusDto;

    @ApiProperty({ type: DependencyStatusDto })
    redis: DependencyStatusDto;
}