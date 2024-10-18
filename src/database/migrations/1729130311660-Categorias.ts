import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Categorias1729130311660 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categorias',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'preDefinida',
            type: 'boolean',
            default: false,
          },
        ],
      }),
    );

    await queryRunner.query(`
      INSERT INTO categorias (nome, "preDefinida") VALUES
      ('Restaurante', true),
      ('Oficina', true),
      ('Variedades', true),
      ('Confeitaria', true),
      ('Construção', true),
      ('Lanchonete', true),
      ('Mercado', true),
      ('Jardinagem', true),
      ('Açougue', true),
      ('Beleza', true)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categorias');
  }
}
