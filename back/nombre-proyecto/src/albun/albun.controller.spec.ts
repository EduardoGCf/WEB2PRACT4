import { Test, TestingModule } from '@nestjs/testing';
import { AlbunController } from './albun.controller';

describe('AlbunController', () => {
    let controller: AlbunController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AlbunController],
        }).compile();

        controller = module.get<AlbunController>(AlbunController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
