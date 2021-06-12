import { JsonController, Body, Post, Get, Param, HttpCode } from 'routing-controllers';
import { Service } from 'typedi';
import { OutletService } from '@api/services/Outlet/OutletService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { OpenAPI } from 'routing-controllers-openapi';

@Service()
@OpenAPI({
  tags: ['Auth'],
})
@JsonController('/getOutletNearby')
export class OutletController extends ControllerBase {
  public constructor(private OutletService: OutletService) {
    super();
  }

  @Get('/:log/:lat')
  @HttpCode(201)
  public async Outlet(@Param('log') logitude: number, @Param('lat') latitude: number) {
    return await this.OutletService.getOutletNearby(logitude, latitude);
  }
}
