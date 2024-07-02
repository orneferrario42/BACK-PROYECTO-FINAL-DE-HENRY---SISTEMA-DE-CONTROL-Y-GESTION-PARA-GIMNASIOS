
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { auth } from 'express-openid-connect';
import { config as auth0Config } from './config/auth0.config';
import { loggerGlobal } from './middleware/logger.middleware';
import { bootstrap } from './bootstrap';


bootstrap();
