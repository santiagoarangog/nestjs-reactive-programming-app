import { Inject, Injectable } from '@nestjs/common';
import { Observable, forkJoin } from 'rxjs';
import { HealthStatus } from '../../domain/model/health-status.model';
import { HealthRepositoryPort } from '../ports/health.repository.port';

@Injectable()
export class CheckHealthUseCase {
    constructor(
        @Inject(HealthRepositoryPort)
        private readonly healthRepository: HealthRepositoryPort,
    ) { }

    execute(): Observable<HealthStatus> {
        return forkJoin({
            database: this.healthRepository.checkDatabaseStatus(),
            redis: this.healthRepository.checkRedisStatus(),
        });
    }
}