import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({ 
  exports: [TypeOrmModule]
})

export class PublicationModule { }