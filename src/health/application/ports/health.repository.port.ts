import { Observable } from 'rxjs';
import { DependencyStatus } from '../../domain/model/health-status.model';

export abstract class HealthRepositoryPort {
    abstract checkDatabaseStatus(): Observable<DependencyStatus>;
    abstract checkRedisStatus(): Observable<DependencyStatus>;
}
