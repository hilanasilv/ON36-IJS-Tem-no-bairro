import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLocalDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  descricao: string;

  @IsNotEmpty()
  endereco: string;

  @IsNotEmpty()
  usuarioNome: string;

  @IsNotEmpty()
  bairroNome: string;

  @IsOptional() 
  horarioFuncionamento?: string;

  @IsArray()
  @IsNotEmpty({ each: true }) 
  categorias: string[]; 
}