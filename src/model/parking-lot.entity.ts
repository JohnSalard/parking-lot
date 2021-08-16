import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ParkingLot', synchronize: true })
export class ParkingLotEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  address: string;

  @Column({ type: 'smallint', nullable: false })
  slot: number;

  @Column({ type: 'smallint', nullable: false })
  remain: number;

  @Column({ type: 'boolean', nullable: false })
  isActive: boolean;

  @Column({ type: 'timestamptz', nullable: false })
  createdAt: Date;
}
