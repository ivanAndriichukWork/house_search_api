import { Logger } from '@nestjs/common';

export class BaseService {
  protected readonly logger: Logger;

  constructor(name: string) {
    this.logger = new Logger(name);
  }
}
