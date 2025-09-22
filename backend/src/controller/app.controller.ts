import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  healthCheck() {
    return { status: 'ok', message: 'DataGate Backend is running 🚀' };
  }

  @Get('logs/:filename')
  getLog(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'error-logs', filename);
    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(404).send('File not found');
    }
  }
}
