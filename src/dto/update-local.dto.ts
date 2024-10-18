import { IsString, IsOptional } from 'class-validator';

export class UpdateLocalDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsString()
  endereco: string;

  @IsOptional()
  @IsString({ each: true }) 
  categoria?: string[];

  @IsString()
  usuarioNome: string;

  @IsString()
  bairroNome: string;

  @IsOptional()
  @IsString()
  horarioFuncionamento?: string;
}
