import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class  Locais1729318017640 implements MigrationInterface {

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

        // Inserindo dados de exemplo
        await queryRunner.query(`
            INSERT INTO locais (nome, descricao, endereco, usuarioNome, bairroNome, horarioFuncionamento)
            VALUES 
            ('Rocha Carnes', 'Supermercado e açougue', 'Rua Maria Vasconcelos de Andrade, 506', 
            (SELECT id FROM usuarios WHERE nome = 'Nayla Hilana'), 
            (SELECT id FROM bairros WHERE nome = 'Aruana'), 
            'Segunda à Sábado da 06:00 às 22:00 | Domingo da 06:00 às 20:00'),

            ('Navio Pirata Pizzaria', 'Pizzaria temática', 'Rua Orlando Tavares Macedo, 1359', 
            (SELECT id FROM usuarios WHERE nome = 'Nayla Hilana'), 
            (SELECT id FROM bairros WHERE nome = 'Aruana'), 
            'Todos os dias | 17:30 às 23:00'),

            ('Sb Stylo Bike', 'Bicicletas, peças e serviços', 'Rua Praia de Aruana, 1300', 
            (SELECT id FROM usuarios WHERE nome = 'Nayla Hilana'), 
            (SELECT id FROM bairros WHERE nome = 'Aruana'), 
            'Seg a Sexta das 08h30 às 18h00 | Sábado das 8h às 13h'),

            ('Cacau Confeitaria', 'Doces, tortas e salgados', 'Rua 4, Conjunto Costa Nova, 261', 
            (SELECT id FROM usuarios WHERE nome = 'Hilana'), 
            (SELECT id FROM bairros WHERE nome = 'Aruana'), 
            'Segunda a Sábado | 8h30 às 21h'),

            ('Flores Vida', 'Variedade em plantas, acessórios e ferramentas de jardinagem', 
            'Avenida Coronel Renir Reis, 32', 
            (SELECT id FROM usuarios WHERE nome = 'Hilana Silva'), 
            (SELECT id FROM bairros WHERE nome = 'Aruana'), 
            'Sem informação de horário de funcionamento');
        `);

        // Inserindo dados na tabela de relacionamento locais_categorias
        await queryRunner.query(`
            INSERT INTO locais_categorias (localId, categoriaId)
            VALUES 
            ((SELECT id FROM locais WHERE nome = 'Rocha Carnes'), (SELECT id FROM categorias WHERE nome = 'Açougue')),
            ((SELECT id FROM locais WHERE nome = 'Navio Pirata Pizzaria'), (SELECT id FROM categorias WHERE nome = 'Restaurante')),
            ((SELECT id FROM locais WHERE nome = 'Sb Stylo Bike'), (SELECT id FROM categorias WHERE nome = 'Oficina')),
            ((SELECT id FROM locais WHERE nome = 'Cacau Confeitaria'), (SELECT id FROM categorias WHERE nome = 'Confeitaria')),
            ((SELECT id FROM locais WHERE nome = 'Flores Vida'), (SELECT id FROM categorias WHERE nome = 'Jardinagem'));
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('locais', 'FK_bairroId_local');
        await queryRunner.dropForeignKey('locais_categorias', 'FK_localId_categoriaId');
        await queryRunner.dropForeignKey('locais', 'FK_usuarioId_local');

        await queryRunner.dropTable('locais_categorias');
        await queryRunner.dropTable('locais');
    }
}