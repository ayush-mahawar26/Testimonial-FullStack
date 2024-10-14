export function TestimonialShimmer() {
  return (
    <div className="w-full mx-5 p-4 rounded-xl bg-black-bg text-slate-200 m-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Shimmer for Avatar */}
          <div className="w-11 h-11 bg-slate-600 rounded-full shimmer"></div>
          <div>
            {/* Shimmer for Author Name */}
            <div className="px-2">
              <div className="h-4 w-24 bg-slate-700 rounded shimmer"></div>
            </div>
            {/* Shimmer for Email */}
            <div className="px-2 mt-1">
              <div className="h-3 w-32 bg-slate-700 rounded shimmer"></div>
            </div>
          </div>
        </div>
        {/* Shimmer for Star Icon */}
        <div className="w-6 h-6 bg-slate-700 rounded-full shimmer"></div>
      </div>

      {/* Shimmer for Title */}
      <div className="mt-5">
        <div className="h-6 w-48 bg-slate-700 rounded shimmer"></div>
        {/* Shimmer for Description */}
        <div className="mt-2 h-4 w-64 bg-slate-700 rounded shimmer"></div>
      </div>

      {/* Shimmer for Date */}
      <div className="flex pt-5">
        <div className="ml-2 h-4 w-24 bg-slate-700 rounded shimmer"></div>
        <div className="ml-2 h-4 w-24 bg-slate-700 rounded shimmer"></div>
      </div>
    </div>
  );
}
