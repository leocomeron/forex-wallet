const ResultCardSkeleton = () => {
  return (
    <div className="bg-[#87e2ae]/10 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="h-5 w-16 bg-[#87e2ae]/20 rounded animate-pulse" />
        <div className="h-5 w-24 bg-[#87e2ae]/20 rounded animate-pulse" />
      </div>
      <div className="mt-1">
        <div className="h-4 w-32 bg-[#87e2ae]/20 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default ResultCardSkeleton;
