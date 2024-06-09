import { Module, NestMiddleware } from '@nestjs/common';

@Module({})
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...', new Date().toLocaleTimeString());
    next();
  }
}
