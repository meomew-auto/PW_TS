import { PlaywrightTestArgs } from '@playwright/test';
import { ProductService } from '../services/ProductService';
import { AuthApiFixture } from './auth.api.fixture';

export type ServicesFixtures = {
  productService: ProductService;
};

type ServiceDeps = PlaywrightTestArgs & AuthApiFixture;

export const serviceFixtures = {
  productService: async (
    { request, authToken }: ServiceDeps,
    use: (r: ProductService) => Promise<void>
  ) => {
    await use(new ProductService(request, authToken));
  },
};
