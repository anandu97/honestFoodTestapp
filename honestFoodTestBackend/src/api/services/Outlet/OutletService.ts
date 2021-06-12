import { Service } from 'typedi';

import { getManager } from 'typeorm';

@Service()
export class OutletService {
  //

  private entityManager = getManager();

  public async getOutletNearby(lng?: number, lat?: number) {
    let [outlet] = await this.entityManager.query(`SELECT *
    FROM outlets
    WHERE ST_Contains("outlets"."outletAreaGeom",(ST_SetSRID(ST_MakePoint(${lat},${lng}),4326))
     )`);
    console.log(outlet);
    return { outlet };
  }
}
