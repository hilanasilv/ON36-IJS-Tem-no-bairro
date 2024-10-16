import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';


export class Locais17290881638290 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'locais',  // Nome da tabela
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        length: '100',  // Limite de 100 caracteres
                        isNullable: false,
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
                        length: '255',  // Limite de 255 caracteres
                        isNullable: false,
                    },
                    {
                        name: 'endereco',
                        type: 'varchar',
                        length: '255',  // Limite de 255 caracteres
                        isNullable: false,
                    },
                    {
                        name: 'categoriaId',
                        type: 'int',
                        isNullable: true,  // Permitido NULL, conforme o relacionamento
                    },
                    {
                        name: 'usuarioId',
                        type: 'int',
                        isNullable: false,  // Relacionamento obrigatório
                    },
                ],
            }),
        );


        // Chave estrangeira para categoria
        await queryRunner.createForeignKey(
            'locais',
            new TableForeignKey({
                columnNames: ['categoriaId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categorias',
                onDelete: 'SET NULL',  // Ao deletar uma categoria, o campo categoriaId será nulo
            }),
        );


        // Chave estrangeira para usuario
        await queryRunner.createForeignKey(
            'locais',
            new TableForeignKey({
                columnNames: ['usuarioId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
                onDelete: 'CASCADE',  // Ao deletar um usuário, os locais associados serão deletados
            }),
        );
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('locais');
    }
}
