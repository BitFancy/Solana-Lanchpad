import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Account from '../Components/Account';
import Auth from './auth';
import Router from 'next/router'
import { useDispatch } from 'react-redux';
import { connectwallethandler } from './api/setConnection';

export default function Home() {
  const dispatch = useDispatch();
  const [errorMessage, SeterrorMessage] = useState(null);
  const [defaultAccount, SetdefaultAccount] = useState();
  const [UserBalance, SetUserBalance] = useState();

  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)
  useEffect(() => {
    connectwallethandler(
      SeterrorMessage,
      SetdefaultAccount,
      SetUserBalance,
      dispatch
    );
  }, []);

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (mounted) {
        if (session) {
          setSession(session)
        }

        setIsLoading(false)
      }
    }

    getInitialSession()

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      mounted = false

      subscription?.unsubscribe()
    }
  }, [])
  useEffect(() => {
    if(!session){
      Router.push('/auth')
    }
  }, []); 

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  )
}