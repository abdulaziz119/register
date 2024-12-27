import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'laravel', name: 'users', synchronize: true })
@Unique(['phoneNumber'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: 'view' })
  phoneNumber: string;

  @Column({ type: 'varchar', default: 'view' })
  name: string;

  @Column({ type: 'varchar', default: 'view' })
  password: string;

  @DeleteDateColumn()
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
