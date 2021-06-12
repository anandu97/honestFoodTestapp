import { Outlet } from '@api/models/Outlet/Outlet';
import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@EntityRepository(Outlet)
export class OutletRepository extends RepositoryBase<Outlet> {
  public async createOutlet(data: object) {
    let entity = new Outlet();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updateOutlet(outlet: Outlet, data: object) {
    Object.assign(outlet, data);

    return await outlet.save(data);
  }
}
