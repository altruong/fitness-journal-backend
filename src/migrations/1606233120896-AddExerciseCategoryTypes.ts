import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExerciseTypes1606233120896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into exercise_category (id, name) values (8, 'Arms');
      insert into exercise_category (id, name) values (9, 'Legs');
      insert into exercise_category (id, name) values (10, 'Abs');
      insert into exercise_category (id, name) values (11, 'Chest');
      insert into exercise_category (id, name) values (12, 'Back');
      insert into exercise_category (id, name) values (13, 'Shoulders');
      insert into exercise_category (id, name) values (14, 'Calves');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
