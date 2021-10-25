import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePublicationDto, UpdatePublicationDto } from '../dtos/publication.dto';
import { Publication } from '../entities/publication.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class PublicationsService {

    constructor(
        @InjectRepository( Publication ) private publicationRepo: Repository< Publication >,
        @InjectRepository( Category ) private categoryRepo: Repository< Category >
    ) { }
    
    findAll(): Promise< Publication [] > {

        return this.publicationRepo.find();

    }

    async findOne( idPublication: number ): Promise< Publication > {
        
        const publication = await this.publicationRepo.findOne( idPublication );

        if ( !publication ) {
            throw new NotFoundException(`Publication #${ idPublication } not found.`);
        }
        
        return publication;
        
    }
    
    async create( data: CreatePublicationDto ):  Promise< Publication > {
        
        const publication = this.publicationRepo.create( data );

        if ( data.categoryId ) {
            const category = await this.categoryRepo.findOne( data.categoryId );
            
            if ( !category ) {
                throw new NotFoundException(`Category #${  data.categoryId } not found.`);
            }

            publication.category = category;
        }

        return this.publicationRepo.save( publication );

    }

    async update( idPublication: number, data: UpdatePublicationDto ):  Promise< Publication > {

        const publication = await this.publicationRepo.findOne( idPublication );

        if ( data.categoryId ) {
            const category = await this.categoryRepo.findOne( data.categoryId );
            
            if ( !category ) {
                throw new NotFoundException(`Category #${  data.categoryId } not found.`);
            }

            publication.category = category;
        }

        this.publicationRepo.merge( publication, data );

        return this.publicationRepo.save( publication );

    }

    remove( idPublication: number ) {

        return this.publicationRepo.delete( idPublication );

    }

    async findProductByCategory( idCategory: number ):  Promise< Publication [] > {

        const category = await this.categoryRepo.findOne( idCategory );

        if ( !category ) {
            throw new NotFoundException(`Category #${  idCategory } not found.`);
        }

        return this.publicationRepo.find({ where: { category } } );

    }
}
