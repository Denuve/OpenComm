import Constants from 'expo-constants';

const getApiUrl = (): string => {
  const hostUri = Constants.expoConfig?.hostUri;

  if (hostUri) {
    const localIp = hostUri.split(':')[0];
    return `http://${localIp}:5000/api`;
  }

  // Fallback pentru emulatoare sau mediu web
  return 'http://localhost:5000/api';
};

export const API_URL = getApiUrl();

console.log('🌐 API URL detectat dinamic:', API_URL);