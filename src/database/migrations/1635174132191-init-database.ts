import {MigrationInterface, QueryRunner} from "typeorm";

export class initDatabase1635174132191 implements MigrationInterface {
    name = 'initDatabase1635174132191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "publications" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "image" character varying(500) NOT NULL, "price" double precision NOT NULL, "status" boolean NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "PK_2c4e732b044e09139d2f1065fae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorys" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_806896a0a29595c702235036597" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "publications" ADD CONSTRAINT "FK_9da5864156a71a46a10290a6dde" FOREIGN KEY ("categoryId") REFERENCES "categorys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" DROP CONSTRAINT "FK_9da5864156a71a46a10290a6dde"`);
        await queryRunner.query(`DROP TABLE "categorys"`);
        await queryRunner.query(`DROP TABLE "publications"`);
    }

}
