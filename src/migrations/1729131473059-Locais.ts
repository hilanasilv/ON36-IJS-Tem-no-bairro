import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Locais1729131473059 implements MigrationInterface {
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

    // Foreign Key para o relacionamento com a tabela 'usuarios'
    await queryRunner.createForeignKey(
      'locais',
      new TableForeignKey({
        columnNames: ['usuarioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'usuarios',
        onDelete: 'CASCADE',
      }),
    );

    // Foreign Key para o relacionamento com a tabela 'bairros'
    await queryRunner.createForeignKey(
      'locais',
      new TableForeignKey({
        columnNames: ['bairroId'],  // Relacionando com a tabela 'bairros'
        referencedColumnNames: ['id'],
        referencedTableName: 'bairros',
        onDelete: 'SET NULL',  // Se o bairro for deletado, o campo pode ser nulo
      }),
    );

    // Tabela pivot para o relacionamento de muitos para muitos com 'categorias'
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

    // Foreign Key para o relacionamento 'locais_categorias' com 'locais'
    await queryRunner.createForeignKey(
      'locais_categorias',
      new TableForeignKey({
        columnNames: ['localId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'locais',
        onDelete: 'CASCADE',
      }),
    );

    // Foreign Key para o relacionamento 'locais_categorias' com 'categorias'
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
    // Remover a Foreign Key de 'bairroId' primeiro
    await queryRunner.dropForeignKey('locais', 'FK_bairroId_local');

    // Drop the locais_categorias first
    await queryRunner.dropTable('locais_categorias');

    // Drop the main table locais
    await queryRunner.dropTable('locais');
  }
}
