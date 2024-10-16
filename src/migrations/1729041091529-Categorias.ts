import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Categorias1729041091529 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Categorias',
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
            name: 'preDefinida', // Adicionando a coluna preDefinida
            type: 'boolean',
            default: false, // Definindo o valor padrão como false
          },
        ],
      }),
    );

    // Inserindo categorias pré-definidas
    await queryRunner.query(`
      INSERT INTO categorias (nome, preDefinida) VALUES
      ('Restaurante', true),
      ('Oficina', true),
      ('Variedades', true),
      ('Confeitaria', true)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Removendo as categorias pré-definidas na reversão, se necessário
    await queryRunner.query(`
      DELETE FROM categorias WHERE nome IN ('Restaurante', 'Oficina', 'Chaveiro', 'Confeitaria');
    `);

    await queryRunner.dropTable('categorias');
  }
}
