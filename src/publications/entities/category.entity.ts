import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';

import { Publication } from './publication.entity';

@Entity({ name: 'categorys' })
export class Category {
    
    @PrimaryGeneratedColumn()
    id:           number;

    @Column({ type: 'varchar', length: 255 })
    title:        string;

    @OneToMany(
        () => Publication,
        (publication) => publication.category
    )
    publications: Publication[];

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createAt:     Date;
    
    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updateAt:     Date;
    
}