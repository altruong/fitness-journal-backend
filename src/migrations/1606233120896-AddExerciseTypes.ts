import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExerciseTypes1606233120896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into exercise_type (name, description, exercise_category_id) values ('Bench Press', 'Bench the bar', 1)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
