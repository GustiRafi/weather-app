import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

const WeatherSkeleton = () => (
  <div className="w-full mx-auto mt-4">
     <div className="grid grid-cols-2 gap-6 justify-between">
        <Skeleton className="text-2xl font-bold text-gray-800 dark:text-white h-8 w-1/2" />
        <Skeleton className="flex gap-2 justify-end h-8  w-3/12 justify-self-end"/>
      </div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-[650px] rounded-lg overflow-hidden mt-4" />
          <div>
            <Skeleton className="w-16 h-16 mb-4" />
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <Skeleton className="bg-gray-200 p-2 rounded-lg w-1/2 h-10" />
                <div className="grid grid-cols-2 gap-2 lg:mt-0 mt-2 w-full">
                    <Skeleton className="bg-gray-200 p-2 rounded-lg h-10" />
                    <Skeleton className="bg-gray-200 p-2 rounded-lg h-10" />
                </div>
            </div>
            <div className="mt-3 h-[300px]">
                <div className="w-full mx-auto mt-5">
                    <Skeleton className="bg-gray-200 p-2 rounded-lg w-3/4 h-10 " />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                        <Skeleton className="bg-gray-200 p-4 rounded-lg shadow-md flex items-center space-x-4 h-[100px]" />
                        <Skeleton className="bg-gray-200 p-4 rounded-lg shadow-md flex items-center space-x-4 h-[100px]" />
                        <Skeleton className="bg-gray-200 p-4 rounded-lg shadow-md flex items-center space-x-4 h-[100px]" />
                        <Skeleton className="bg-gray-200 p-4 rounded-lg shadow-md flex items-center space-x-4 h-[100px]" />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
  </div>
);

const WeatherWrapper = dynamic(() => import('./WeatherCard'), {
  ssr: false,
  loading: () => <WeatherSkeleton />,
});

export default WeatherWrapper;
