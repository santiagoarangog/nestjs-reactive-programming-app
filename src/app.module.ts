import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// 👇 1. Importa los módulos de tus dominios (hexágonos)
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    // Módulos de infraestructura y configuración global
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('NODE_ENV') === 'dev' ? true : false,
        extra: {
          ssl: {
            rejectUnauthorized: false, // Solo para desarrollo
          },
        },
      }),
    }),

    // 👇 2. Registra aquí los módulos de tu aplicación
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
