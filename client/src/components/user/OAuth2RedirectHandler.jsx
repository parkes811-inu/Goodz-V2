import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');

        if (token) {
            document.cookie = `accessToken=${token}; path=/;`;
            navigate('/');
        } else {
            navigate('/login?error=OAuth2AuthenticationFailed');
        }
    }, [location, navigate]);

    return <div>Loading...</div>;
};

export default OAuth2RedirectHandler;
