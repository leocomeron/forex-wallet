const ResultCardSkeleton = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <div className="bg-mint/10 p-4 rounded-lg" key={index}>
      <div className="flex justify-between items-center">
        <div className="h-5 w-16 bg-mint/20 rounded animate-pulse" />
        <div className="h-5 w-24 bg-mint/20 rounded animate-pulse" />
      </div>
      <div className="mt-1">
        <div className="h-4 w-32 bg-mint/20 rounded animate-pulse" />
      </div>
    </div>
  ));
};

export default ResultCardSkeleton;
