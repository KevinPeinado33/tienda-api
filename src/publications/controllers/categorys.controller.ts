import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategorysService } from '../services/categorys.service';
import { Category } from '../entities/category.entity';

@ApiTags('categorys')
@Controller('categorys')
export class CategorysController {

    constructor( private categoryService: CategorysService ) { }

    @Get()
    @ApiOperation({ summary: 'List of categorys.'})
    getCategorys( ): Promise< Category [] > {
        return this.categoryService.findAll();
    }
    
}
