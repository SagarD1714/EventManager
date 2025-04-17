import React from 'react'

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className="relative h-14 w-14 animate-spin rounded-full border-t-4 border-b-4 border-blue-500">
                {/* <div className="absolute top-1/2 left-1/2 h-12 w-12 animate-spin-reverse rounded-full border-t-4 border-b-4 border-blue-400 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute top-1/2 left-1/2 h-10 w-10 animate-spin-reverse rounded-full border-t-4 border-b-4 border-blue-300 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="absolute top-1/2 left-1/2 h-8 w-8 animate-spin-reverse rounded-full border-t-4 border-b-4 border-blue-300 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="absolute top-1/2 left-1/2 h-6 w-6 animate-spin-reverse rounded-full border-t-4 border-b-4 border-blue-300 transform -translate-x-1/2 -translate-y-1/2">

                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>


    )
}

export default Loader
