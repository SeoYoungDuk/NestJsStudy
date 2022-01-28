import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DogsModule} from './dogs/dogs.module';
import {CatsModule} from "./cats/cats.module";
import {LoggerMiddleware} from "./middeleware/logger.middleware";
import {CatsController} from "./cats/cats.controller";
import {APP_FILTER, APP_INTERCEPTOR, APP_PIPE} from "@nestjs/core";
import {HttpExceptionFilter} from "./exception/http-exception.filter";
import {ValidationPipe} from "./pipe/validation.pipe";
import {TransformInterceptor} from "./interceptor/transform.interceptor";
import {LoggingInterceptor} from "./interceptor/logging.interceptor";


@Module({
    imports: [DogsModule, CatsModule],
    controllers: [AppController],
    providers: [AppService,
        {provide: APP_FILTER, useClass: HttpExceptionFilter},
        {provide: APP_PIPE, useClass: ValidationPipe},
        {provide: APP_INTERCEPTOR, useClass: LoggingInterceptor},
        {provide: APP_INTERCEPTOR, useClass: TransformInterceptor}],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .exclude(
                {path: 'cats', method: RequestMethod.POST}
            )
            // .forRoutes({path: 'cats', method: RequestMethod.GET});
            .forRoutes(CatsController)
    }
}
