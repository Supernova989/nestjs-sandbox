import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { validate, config, configFactory } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configFactory],
      validate: validate,
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),
    AuthModule,
    UserModule,
    MongooseModule.forRoot(config.MONGO_DB_CONNECTION),
  ],
  controllers: [],
})
export class AppModule {}
