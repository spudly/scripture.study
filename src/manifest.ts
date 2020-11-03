/* eslint-disable camelcase */
import {WebAppManifest} from './types';

const manifest: WebAppManifest = {
  background_color: '#edf2f7', // bg-gray-200
  categories: ['books'],
  description: 'Collaborative Scripture Study',
  dir: 'ltr',
  display: 'standalone',
  icons: [
    {
      src: '/icons/logo-192.png',
      type: 'image/png',
      sizes: '192x192',
    },
    {
      src: '/icons/logo-512.png',
      type: 'image/png',
      sizes: '512x512',
    },
  ],
  lang: 'en-US',
  name: 'Scripture Study',
  short_name: 'Scripture Study',
  orientation: 'portrait-primary',
  start_url: '/',
  theme_color: '#fefcbf', // bg-yellow-200
};

export default manifest;
