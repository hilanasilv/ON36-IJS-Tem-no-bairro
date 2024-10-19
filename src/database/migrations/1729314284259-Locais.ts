import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Locais1729314284259 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'locais',
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
                        length: '100',
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'endereco',
                        type: 'varchar',
                        length: '255',
                    },

                    {
                        name: 'bairroId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'horarioFuncionamento',
                        type: 'varchar',
                        length: '100',
                        default: "'Sem informações sobre horário de funcionamento'",
                    },
                    {
                        name: 'usuarioId',
                        type: 'int',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'locais',
            new TableForeignKey({
                columnNames: ['usuarioId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'locais',
            new TableForeignKey({
                columnNames: ['bairroId'], 
                referencedColumnNames: ['id'],
                referencedTableName: 'bairros',
                onDelete: 'SET NULL', 
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'locais_categorias',
                columns: [
                    {
                        name: 'localId',
                        type: 'int',
                    },
                    {
                        name: 'categoriaId',
                        type: 'int',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'locais_categorias',
            new TableForeignKey({
                columnNames: ['localId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'locais',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'locais_categorias',
            new TableForeignKey({
                columnNames: ['categoriaId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categorias',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('locais', 'FK_bairroId_local');

        await queryRunner.dropTable('locais_categorias');

        await queryRunner.dropTable('locais');
    }
}

