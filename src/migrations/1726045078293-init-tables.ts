import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTables1726045078293 implements MigrationInterface {
  name = 'InitTables1726045078293';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "house_images" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "image_url" character varying NOT NULL, "is_main" boolean NOT NULL DEFAULT false, "description" character varying NOT NULL, "house_id" integer, CONSTRAINT "PK_fee34f39ba1aec169bc86e49e31" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "house_locations" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "country" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "postal_code" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_50f42b6e87076af4d9c8343d06e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "houses" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "price" integer NOT NULL, "area" integer NOT NULL, "rooms" integer NOT NULL, "bathrooms" integer NOT NULL, "bedrooms" integer NOT NULL, "property_type" character varying NOT NULL, "living_type" character varying NOT NULL, "location_id" integer, CONSTRAINT "REL_3a143048f84c7bec999cbded1d" UNIQUE ("location_id"), CONSTRAINT "PK_ee6cacb502a4b8590005eb3dc8d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "house_images" ADD CONSTRAINT "FK_c4569b8493d8a38a0ae4ee26dea" FOREIGN KEY ("house_id") REFERENCES "houses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "houses" ADD CONSTRAINT "FK_3a143048f84c7bec999cbded1df" FOREIGN KEY ("location_id") REFERENCES "house_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "houses" DROP CONSTRAINT "FK_3a143048f84c7bec999cbded1df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "house_images" DROP CONSTRAINT "FK_c4569b8493d8a38a0ae4ee26dea"`,
    );
    await queryRunner.query(`DROP TABLE "houses"`);
    await queryRunner.query(`DROP TABLE "house_locations"`);
    await queryRunner.query(`DROP TABLE "house_images"`);
  }
}
