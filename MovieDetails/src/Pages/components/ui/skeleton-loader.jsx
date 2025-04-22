const SkeletonCard = () => {
    return (
      <div className="animate-pulse h-64 sm:h-80 md:h-96 w-40 sm:w-52 md:w-64 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 mb-8">
        <div className="w-full h-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
    )
  }
  
  const SkeletonGrid = ({ count = 10 }) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
    )
  }
  
  const SkeletonText = ({ width = "w-full", height = "h-4" }) => {
    return <div className={`animate-pulse ${width} ${height} bg-gray-300 dark:bg-gray-700 rounded`}></div>
  }
  
  export { SkeletonCard, SkeletonGrid, SkeletonText }
  