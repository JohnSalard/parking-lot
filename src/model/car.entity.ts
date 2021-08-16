import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Car', synchronize: true })
export class CarEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  parkingLotId: number;

  @Column({ type: 'boolean', nullable: false })
  isRegister: boolean;

  @Column({ type: 'timestamptz', nullable: false })
  registeredAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  unregisteredAt: Date;

  @Column({ type: 'varchar', length: 100, nullable: false })
  typeName: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  brandName: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  plateNumber: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  size: string;
}
