import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateLocalDto {
  @IsString()
  @ApiProperty()
  nome: string;

  @IsString()
  @ApiProperty()
  descricao: string;

  @IsString()
  @ApiProperty()
  endereco: string;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty()
  categoria?: string[];

  @IsString()
  @ApiProperty()
  usuarioNome: string;

  @IsString()
  @ApiProperty()
  bairroNome: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  horarioFuncionamento?: string;
}
