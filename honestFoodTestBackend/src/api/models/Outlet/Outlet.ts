import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { Exclude, Expose } from 'class-transformer';
import { Geometry } from 'geojson';
@Entity({ name: 'outlets' })
export class Outlet extends EntityBase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  outlet_name: string;

  @Column({ nullable: true })
  outlet_description: string;

  @Column({ nullable: true })
  area_name: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  outletGeom: Geometry;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Polygon',
    srid: 4326,
    nullable: true,
  })
  outletAreaGeom: Geometry;
}
