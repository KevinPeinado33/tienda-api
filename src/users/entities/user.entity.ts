import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';

import { Publication } from '../../publications/entities/publication.entity';

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 120 })
    name: string;
    
    @Column({ type: 'varchar', length: 30 })
    user: string;
    
    @Column({ type: 'varchar', length: 100 })
    password: string;
    
    @Column({ type: 'boolean' })
    state: boolean;

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

    @OneToMany( 
        () => Publication, 
        ( publication ) => publication.user 
    )
    publication: Publication[];
}