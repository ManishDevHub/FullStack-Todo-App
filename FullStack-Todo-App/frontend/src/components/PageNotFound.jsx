import React from 'react'
import { Link } from 'react-router-dom';
export default function PageNotFound() {
  return (<>

  <div className="flex h-screen items-center justify-center space-x-2 flex-col">
  <span className='text-2xl'>404</span>
  <div className='text-xl font-semibold text-green-900'>Page Not Found</div>
        <p className="text-gray-600 mb-6">Sorry, the page you're looking for doesn't exist.</p>
          <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition duration-300"
      >
        Go to Home
      </Link>
  </div>
  </>
    
  )
}
