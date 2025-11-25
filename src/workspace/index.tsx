import Header from '@/components/custom/Header';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useCallback, useContext, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { firebaseDb } from '../../config/FirebaseConfig';
import type { UserDetail } from '../../context/UserDetailContext';
import { UserDetailContext } from '../../context/UserDetailContext';
import PromtBox from '@/components/custom/PromtBox';

function Workspace() {

  const {user, isLoaded} = useUser();
  const context = useContext(UserDetailContext);
  const setUserDetail = context?.setUserDetail;
  const location = useLocation();

  //If the user is not signed in
  const CreateNewUser = useCallback(async () => {

    if(user){
      //If user is alreay exixt in DB
      const docRef = doc(firebaseDb, "users", user?.primaryEmailAddress?.emailAddress??'');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const userData = docSnap.data() as UserDetail;
        setUserDetail?.(userData);
      } else {
        // Insert new user
        const newUser: UserDetail = {
          fullName: user?.fullName ?? '',
          email: user?.primaryEmailAddress?.emailAddress ?? '',
          createdAt: new Date(),
          credits: 2,
        };
        await setDoc(doc(firebaseDb, "users", user?.primaryEmailAddress?.emailAddress??''), newUser);
        setUserDetail?.(newUser);
      }
    }
  }, [user, setUserDetail]);

  useEffect(() => {
    if (user) {
      CreateNewUser();
    }
  }, [user, CreateNewUser]);

  if(!user && isLoaded){
    return <div>Please sign in to access the workspace.
      <Link to="/">
      <Button>Sign In</Button>
      </Link>
    </div>
  }

  return (
    <div>
      <Header/>
      {location.pathname === '/workspace' && <PromtBox/>}
      <Outlet/>
    </div>
  )
}

export default Workspace