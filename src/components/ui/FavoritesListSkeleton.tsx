import React from 'react';
import Skeleton from './Skeleton';

interface FavoritesListSkeletonProps {
  count?: number;
}

const FavoritesListSkeleton: React.FC<FavoritesListSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-start gap-2 p-4 rounded-lg border border-[#21262D] bg-[#161B22]"
          style={{ width: '976.656px' }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-4">
              <Skeleton 
                variant="circular" 
                width={40} 
                height={40} 
              />
              <div className="space-y-2">
                <Skeleton 
                  variant="text" 
                  width={200} 
                  height={16}
                />
                <Skeleton 
                  variant="text" 
                  width={80} 
                  height={14}
                />
              </div>
            </div>
            <Skeleton 
              variant="rounded" 
              width={150} 
              height={36}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesListSkeleton;