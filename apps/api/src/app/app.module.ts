import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../infrastructure/prisma/prisma.module';
import { WorkTypeModule } from '../modules/work-type/work-type.module';
import { appConfig, environmentValidationSchema } from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: environmentValidationSchema,
      validationOptions: {
        abortEarly: false,
        allowUnknown: true,
      },
    }),
    PrismaModule,
    WorkTypeModule,
  ],
})
export class AppModule {}
