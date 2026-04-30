import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('C:\\Users\\groni\\HRMS Automation', '../../.env') });

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
    email: process.env.SHREE_EMAIL || 'avishkar@groniva.com',
    mobile: process.env.SHREE_MOBILE || '9011409986', // Add mobile
    password: process.env.SHREE_PASSWORD || 'Vermilion@2026',
  },
};

export const testData = {
  employeeIds: ['1047', '1048', '1049'],
  defaultTimeout: 30000,
};
