import { FC } from 'react';
import Skeleton from './Skeleton';
import type { FavoritesListSkeletonProps } from "@/types";

const FavoritesListSkeleton: FC<FavoritesListSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-full flex flex-col items-start gap-2 p-3 sm:p-4 rounded-lg border border-[#21262D] bg-[#161B22]"
        >
          <div className="flex items-center justify-between w-full flex-wrap gap-3 sm:flex-nowrap">
            <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
              <Skeleton 
                variant="circular" 
                width={32} 
                height={32} 
                className="sm:w-10 sm:h-10"
              />
              <div className="space-y-2 flex-1 min-w-0">
                <Skeleton 
                  variant="text" 
                  width="60%" 
                  height={14}
                  className="sm:h-4"
                />
                <Skeleton 
                  variant="text" 
                  width="40%" 
                  height={12}
                  className="sm:h-3"
                />
              </div>
            </div>
            <Skeleton 
              variant="rounded" 
              width={80} 
              height={32}
              className="sm:w-36 sm:h-9 flex-shrink-0"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesListSkeleton;