import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';

@Injectable()
export class CategorysService {

    constructor(
        @InjectRepository( Category ) private publicationRepo: Repository< Category >
    ) { }
    
    findAll(): Promise< Category [] > {

        return this.publicationRepo.find();
    
    }
}
