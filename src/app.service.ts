import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    return `Hello I am learning Nest.js Fundamentals`;
  }
}
