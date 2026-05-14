import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fitnesspro.app',
  appName: 'Fitness Pro',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
