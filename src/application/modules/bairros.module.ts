import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BairrosController } from '../../controllers/bairros.controller';
import { BairrosService } from '../../services/bairros.service';
import { Bairro } from '../../domains/entities/bairro.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Bairro])],
    controllers: [BairrosController],
    providers: [BairrosService],
    exports: [TypeOrmModule],
})
export class BairrosModule {}
