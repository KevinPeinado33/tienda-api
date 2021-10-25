import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PublicationsController } from './controllers/publications.controller';
import { PublicationsService } from './services/publications.service';
import { Publication } from './entities/publication.entity';

import { Category } from './entities/category.entity';
import { CategorysController } from './controllers/categorys.controller';
import { CategorysService } from './services/categorys.service';

@Module({ 
  imports: [TypeOrmModule.forFeature([ Publication, Category])],
  controllers: [PublicationsController, CategorysController], 
  providers: [PublicationsService, CategorysService],
  exports: [TypeOrmModule]
})

export class PublicationModule { }