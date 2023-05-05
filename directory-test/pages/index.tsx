import React, { useEffect, useState } from 'react';
import KanvasCore, { AuthenticationInterface, genericAuthMiddleware } from '@kanvas/core';

const AUTH_KEY = 'AUTH.TOKEN';
const AUTH_REFRESH = 'AUTH.REFRESH';

async function getToken() {
  return new Promise<string>((resolve) => {
    const key = localStorage.getItem(AUTH_KEY);
    resolve(key);
  });
}

const { client, ...core } = new KanvasCore({
  key: '7d0488b2-632e-4045-9d2d-370d9161644a',
  url: 'https://graphapidev.kanvas.dev/graphql',
  middlewares: [
    genericAuthMiddleware(getToken)
  ]  
});

export function useAuth() {
  const [token, setToken] = useState<AuthenticationInterface>();

  const fetch = async () => {
    const current = await getToken();
    if (!!current) return;

    const response = await core.auth.login(
      'develeads@salesassist.io',
      'nosenose'
    );

    localStorage.setItem(AUTH_KEY, response.token);
    localStorage.setItem(AUTH_REFRESH, response.refresh_token);

    setToken(response);
  };
  
  useEffect(() => {
    fetch();
  }, []);
}

export default function Home() {
  useAuth();


  return (
    <h1>Hola</h1>
  );
}