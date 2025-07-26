import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 👈 Importar
// ...otros imports
import { HealthRepositoryPort } from './application/ports/health.repository.port';
import { CheckHealthUseCase } from './application/use-cases/check-health.use-case';
import { HealthController } from './infrastructure/driving-adapters/http/health.controller';
import { HealthRepository } from './infrastructure/driven-adapters/typeorm-redis/health.repository';

@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                ttl: configService.get<number>('CACHE_TTL', 5000),
                max: configService.get<number>('CACHE_MAX', 10),
            }),
        }),
    ],
    controllers: [HealthController],
    providers: [
        CheckHealthUseCase,
        {
            provide: HealthRepositoryPort,
            useClass: HealthRepository,
        },
    ],
})
export class HealthModule { }