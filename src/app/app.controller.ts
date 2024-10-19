import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service'; 
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('home')
export class AppController {
  constructor(private readonly appService: AppService) {} 

  @Get()
  @ApiOperation({summary: 'Rota inicial de boas vindas'})
  @ApiResponse({status: 200, description: 'Texto de boas vindas'})
  getHello(): string {
    return this.appService.getHello(); 
  }
}
