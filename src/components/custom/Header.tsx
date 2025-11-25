import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { GemIcon } from 'lucide-react';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { Button } from '../ui/button';
import { UserDetailContext } from './../../../context/UserDetailContext';

function Header() {

    const {user} = useUser();
    const location = useLocation();
    const context = useContext(UserDetailContext);
    const userDetail = context?.userDetail;

    console.log(location.pathname);

  return (
    <div className="flex items-center justify-between px-10 shadow">
        <img src={logo} alt="Logo" width={130} height={130} />
        {!user ?
        <SignInButton mode='modal'>
            <Button>Get Started</Button>
        </SignInButton>
        : <div className='flex gap-5 items-center'>
            <UserButton/>
            {location.pathname.includes('workspace') ?
                <div className='flex gap-2 items-center p-2 px-3 bg-orange rounded-full'>
                    <GemIcon />{userDetail?.credits??0}
                </div>:
                <Link to="/workspace">
                    <Button>Go to Workspace</Button>
                </Link>
            }
        </div>}
    </div>
  )
}

export default Header