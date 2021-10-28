import dotenv from 'dotenv';

dotenv.config();

// @ts-expect-error
global.IS_DEV = process.env.NODE_ENV === 'development';
// @ts-expect-error
global.IS_PROD = process.env.NODE_ENV === 'production';
// @ts-expect-error
global.IS_TEST = process.env.NODE_ENV === 'test';
