const CurrencySelectorSkeleton = () => {
  return (
    <div className="space-y-2">
      <div className="h-6 w-20 bg-mint/20 rounded animate-pulse" />
      <div className="relative">
        <div className="w-full p-3 ring-1 ring-mint rounded-md bg-blueberry">
          <div className="flex justify-between items-center">
            <div className="h-5 w-48 bg-mint/20 rounded animate-pulse" />
            <div className="h-5 w-5 bg-mint/20 rounded animate-pulse" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="h-4 w-32 bg-mint/20 rounded animate-pulse" />
        <div className="h-4 w-24 bg-mint/20 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default CurrencySelectorSkeleton;
