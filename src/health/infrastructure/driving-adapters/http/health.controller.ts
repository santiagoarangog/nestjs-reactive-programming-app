import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckHealthUseCase } from '../../../application/use-cases/check-health.use-case';
import { HealthStatusDto } from './dto/health-status.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
    constructor(private readonly checkHealthUseCase: CheckHealthUseCase) { }

    @Get()
    @ApiOperation({ summary: 'Comprueba el estado de salud de la aplicación y sus dependencias.' })
    @ApiResponse({ status: 200, description: 'La aplicación y sus dependencias están saludables.', type: HealthStatusDto })
    @ApiResponse({ status: 503, description: 'Una o más dependencias no están disponibles.' })
    check(): Observable<HealthStatusDto> {
        return this.checkHealthUseCase.execute().pipe(
            map(status => {
                if (status.database.status === 'down' || status.redis.status === 'down') {
                    throw new ServiceUnavailableException(status);
                }
                return status;
            }),
        );
    }
}