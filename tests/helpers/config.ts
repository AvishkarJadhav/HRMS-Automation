import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  //baseURL: process.env.BASE_URL || 'https://test.groniva.net',
  shreeURL: process.env.SHREE_URL || 'https://shree.groniva.net',
  timeout: 30000,
  navigationTimeout: 30000,
  actionTimeout: 10000,
};

export const testUsers = {
  testUser: {
    email: process.env.TEST_EMAIL || 'amolm@gmail.com',
    mobile: process.env.TEST_MOBILE || '8805132484', // Add mobile
    password: process.env.TEST_PASSWORD || 'Vermilion@2026',
    name: 'Chetan',
  },
  shreeUser: {
    email: process.env.SHREE_EMAIL || 'ckoranne89@gmail.com',
    mobile: process.env.SHREE_MOBILE || '9011409986', // Add mobile
    password: process.env.SHREE_PASSWORD || 'Shree@123',
  },
};

export const testData = {
  taskIds: ['1027', '1028', '1050'],
  defaultTimeout: 30000,
};

export const orgDetails = {
  name: process.env.ORG_NAME || 'Groniva',
  shortName: process.env.ORG_SHORT_NAME || 'Groniva', 
  code: process.env.ORG_CODE || 'GRV',
  legalType: process.env.ORG_LEGAL_TYPE || 'Private Limited',
  industryType: process.env.ORG_INDUSTRY_TYPE || 'Technology',
  status: process.env.ORG_STATUS || 'Active',
  shortDescription: process.env.ORG_SHORT_DESCRIPTION || 'Groniva Organization',

  defaultTimeout: 30000,
};
