import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/header';

const AppLayout = () => {
    return  (
      <div className='bg-gray-950 text-white min-h-screen'>     
        <div className='container px-4 sm:px-6 lg:px-8 py-4 mx-auto max-w-7xl'>
          <Header /> 

          <main className='mt-6'>
            <Outlet />
          </main>
        </div>
      </div>
    );
  
};

export default AppLayout
