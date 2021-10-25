import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Param, 
    ParseIntPipe, 
    Post, 
    Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PublicationsService } from '../services/publications.service';
import { Publication } from '../entities/publication.entity';
import { CreatePublicationDto, UpdatePublicationDto } from '../dtos/publication.dto';

@ApiTags('publications')
@Controller('publications')
export class PublicationsController {

    constructor( private publicationService: PublicationsService ) { }

    @Get()
    @ApiOperation({ summary: 'List of publications without conditionales.' })
    getPublications(): Promise< Publication [] >{
        return this.publicationService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    getOne( @Param('id', ParseIntPipe) idPublication: number ): Promise< Publication > {
        return this.publicationService.findOne(idPublication);
    }

    @Post()
    create( @Body() payload: CreatePublicationDto ): Promise< Publication > {
        return this.publicationService.create( payload );
    }

    @Put(':id')
    update(
        @Param('id') idPublication: number, 
        @Body() payload: UpdatePublicationDto
    ): Promise< Publication > {
        return this.publicationService.update( idPublication, payload );
    }

    @Delete(':id')
    delete( @Param('id', ParseIntPipe ) idPublication: number ) {
        return this.publicationService.remove( idPublication );
    }

    @Get('category/:id')
    @ApiOperation({ summary: 'List of publications by category.' })
    findProductByCategory( @Param('id') idCategory: number ):  Promise< Publication [] > {

        return this.publicationService.findProductByCategory( idCategory );

    }
}