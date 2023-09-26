import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Xyz21sur@',
      database: 'assigment-app',
      entities: [
          "dist/**/*.entity{.ts,.js}"
      ],
      migrations: ["dist/migrations/*{.ts,.js}"],
      autoLoadEntities: true,
      synchronize: true,
      logging:true
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
