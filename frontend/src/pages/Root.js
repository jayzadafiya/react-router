import React, { useEffect } from 'react'
import { Outlet, useLoaderData, useNavigate, useNavigation, useSubmit } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'
import { getTokenDuration } from '../util/auth';

function Root() {
    // const navigation = useNavigation();
    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {

        if (!token) {
            return;
        }

        if (token === 'EXPIRED') {
            submit(null, { action: '/logout', method1: 'post' })
        }

        const tokenDuration = getTokenDuration();

        setTimeout(() => {
            submit(null, { action: '/logout', method1: 'post' })
        }, tokenDuration);

    }, [token, submit])

    return (
        <>
            <MainNavigation />
            <main>
                {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
                <Outlet />
            </main>
        </>
    )
}

export default Root
