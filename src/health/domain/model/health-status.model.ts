export interface DependencyStatus {
    status: 'up' | 'down';
}

export interface HealthStatus {
    database: DependencyStatus;
    redis: DependencyStatus;
}