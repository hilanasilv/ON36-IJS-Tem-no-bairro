import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BairrosController } from './bairros.controller';
import { BairrosService } from './bairros.service';
import { Bairro } from './bairro.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Bairro])],
    controllers: [BairrosController],
    providers: [BairrosService],
    exports: [TypeOrmModule],
})
export class BairrosModule {}
