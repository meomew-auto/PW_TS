import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import { CustomerInfo } from '../pom/CRMNewCustomerPage';

//Auto + company name + timstamp
export function generateCompanyName(prefix: string): string {
  const fakeCompany = faker.company.name();
  const timestamp = format(new Date(), 'HH:mm:ss');
  return `${prefix} ${fakeCompany} ${timestamp}`;
}

export function createMinimalCustomerInfo(overrides?: Partial<CustomerInfo>): CustomerInfo {
  return {
    company: generateCompanyName('Auto PW'),
    ...overrides,
  };
}

export function createFullCustomerInfo(overrides?: Partial<CustomerInfo>): CustomerInfo {
  return {
    company: overrides?.company ?? generateCompanyName('Auto PW'),
    phone: overrides?.phone ?? faker.phone.number(),
    vat: overrides?.vat ?? faker.string.numeric(10),
    website: overrides?.website ?? faker.internet.url(),
    currency: overrides?.currency ?? faker.helpers.arrayElement(['USD', 'EUR']),
    language: overrides?.language ?? 'Vietnamese',
    address: overrides?.address ?? faker.location.streetAddress(),
    city: overrides?.address ?? faker.location.city(),
    state: overrides?.state ?? faker.location.state(),
    zip: overrides?.zip ?? faker.location.zipCode(),
    country: overrides?.country ?? 'Vietnam',
    ...overrides,
  };
}
