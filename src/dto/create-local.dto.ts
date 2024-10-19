import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLocalDto {
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @ApiProperty()
  descricao: string;

  @IsNotEmpty()
  @ApiProperty()
  endereco: string;

  @IsNotEmpty()
  @ApiProperty()
  usuarioNome: string;

  @IsNotEmpty()
  @ApiProperty()
  bairroNome: string;

  @IsOptional() 
  @ApiProperty()
  horarioFuncionamento?: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  @ApiProperty() 
  categorias: string[]; 
}