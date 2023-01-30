import { signOut } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';

export const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log(user)
  return (
    <div>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  )
}
