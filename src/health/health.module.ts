import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthRepositoryPort } from './application/ports/health.repository.port';
import { CheckHealthUseCase } from './application/use-cases/check-health.use-case';
import { HealthRepository } from './infrastructure/driven-adapters/typeorm-redis/health.repository';
import { HealthV1Controller } from './infrastructure/driving-adapters/http/v1/health.v1.controller';
import { HealthV2Controller } from './infrastructure/driving-adapters/http/v2/health.v2.controller';

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
    controllers: [HealthV1Controller, HealthV2Controller],
    providers: [
        CheckHealthUseCase,
        {
            provide: HealthRepositoryPort,
            useClass: HealthRepository,
        },
    ],
})
export class HealthModule { }