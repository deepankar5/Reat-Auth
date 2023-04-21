import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../utils/auth';

function RootLayout() {
  const token = useLoaderData()
  const sumbit = useSubmit()
  useEffect(()=> {
    if(!token){
      return
    }
    if(token === 'EXPIRED'){
      sumbit(null, {action: '/logout', method: 'post'})
    }
    const tokenDuration = getTokenDuration()
    console.log(tokenDuration)

    let interval = setTimeout(()=> {
      sumbit(null, {action: '/logout', method: 'post'})
    },tokenDuration)

    return ()=> {clearTimeout(interval)}

  }, [token, sumbit])
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
