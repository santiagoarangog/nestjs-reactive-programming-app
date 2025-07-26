// Imports...
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Cache } from 'cache-manager';
import { from, Observable, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { HealthRepositoryPort } from '../../../application/ports/health.repository.port';
import { DependencyStatus } from '../../../domain/model/health-status.model';

@Injectable()
export class HealthRepository implements HealthRepositoryPort {
  private readonly logger = new Logger(HealthRepository.name);

  constructor(
    private dataSource: DataSource, // ✅ Inyecta DataSource directamente
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  checkDatabaseStatus(): Observable<DependencyStatus> {
    return from(this.dataSource.query('SELECT 1')).pipe(
      timeout(1000),
      map(() => ({ status: 'up' as const })),
      catchError((err) => {
        this.logger.error('Fallo en la comprobación de la base de datos', err);
        return of({ status: 'down' as const });
      }),
    );
  }

  checkRedisStatus(): Observable<DependencyStatus> {
    const testKey = 'health-check';
    const testValue = 'ok';

    return from(this.cacheManager.set(testKey, testValue, 1000)).pipe(
      timeout(1000),
      map(() => ({ status: 'up' as const })),
      catchError((err) => {
        this.logger.error('Fallo en la comprobación de Redis (Cache)', err);
        return of({ status: 'down' as const });
      }),
    );
  }
}
