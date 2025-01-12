  

  
  export  const LoadingProductSkeleton = () => (
    <div className="flex flex-col h-[390px] justify-between bg-gray-700 p-4 rounded-2xl ">
        <div className="w-full h-[270px] rounded-2xl skeleton"></div>

        <div className="py-4 w-full flex flex-col gap-3">
            <div className="h-5 w-full rounded-2xl skeleton"></div>
            <div className="h-5 w-1/2 rounded-2xl skeleton"></div>
            <div className="h-5 w-1/4 rounded-2xl skeleton"></div>
        </div>
    </div>
)


export  const LoadingRequestSkeleton = () => (
    <div className="flex flex-row h-[150px] justify-between bg-gray-700 p-4 rounded-2xl ">

        <div className="py-4 w-full flex flex-col gap-3">
            <div className="h-5 w-1/3 rounded-2xl skeleton"></div>
            <div className="h-5 w-1/2 rounded-2xl skeleton"></div>
            <div className="h-5 w-1/4 rounded-2xl skeleton"></div>
        </div>

        <div className="py-4 w-full flex items-end justify-en flex-col gap-3">
            <div className="h-5 w-1/3 rounded-2xl skeleton"></div>
            <div className="h-5 w-1/5 rounded-2xl skeleton"></div>
            <div className="h-5 w-1/4 rounded-2xl skeleton"></div>
        </div>
    </div>
)