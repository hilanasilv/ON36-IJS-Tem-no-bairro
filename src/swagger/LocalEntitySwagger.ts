import { ApiProperty } from '@nestjs/swagger';
import { Local } from '../domains/entities/local.entity'

export class LocalEntitySwagger extends Local {
    @ApiProperty()
    nome: string;

    @ApiProperty()
    descricao: string;
    
    @ApiProperty()
    endereco: string;
    
    @ApiProperty()
    categoria: string;

    @ApiProperty()
    usuarioNome: string;
    
    @ApiProperty()
    bairroNome: string;

    @ApiProperty()
    horarioFuncionamento: string;
}