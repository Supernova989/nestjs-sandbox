import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const wireUpSwagger = (path: string, app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Swagger docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, doc);
};
