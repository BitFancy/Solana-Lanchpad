import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../Components/Auth';
import Account from '../Components/Account';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)

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