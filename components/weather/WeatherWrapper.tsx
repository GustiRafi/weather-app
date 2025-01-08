import dynamic from 'next/dynamic';

const WeatherWrapper = dynamic(() => import('./WeatherCard'), { ssr: false });

export default WeatherWrapper;