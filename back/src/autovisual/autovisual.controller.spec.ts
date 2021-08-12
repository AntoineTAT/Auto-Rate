import { Test, TestingModule } from '@nestjs/testing';
import { AutovisualController } from './autovisual.controller';

describe('AutovisualController', () => {
  let controller: AutovisualController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutovisualController],
    }).compile();

    controller = module.get<AutovisualController>(AutovisualController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
