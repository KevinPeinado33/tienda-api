import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from 'typeorm';

import { Category } from './category.entity';

@Entity({ name: 'publications' })
export class Publication {
    
    @PrimaryGeneratedColumn()
    id:          number;

    @Column({ type: 'varchar', length: 255 })
    title:       string;

    @Column({ type: 'varchar', length: 255 })
    description: string;
    
    @Column({ type: 'varchar', length: 500 })
    image:       string;

    @Column({ type: 'float' })
    price:       number;
    
    @Column({ type: 'boolean' })
    status:      boolean;

    @ManyToOne( () => Category )
    category:    Category;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createAt:    Date;
    
    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updateAt:    Date;
    
}