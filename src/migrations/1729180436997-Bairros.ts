import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class  Bairros1729180436997 implements MigrationInterface {

      public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'bairros',
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
            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('bairros');
      }
}
    