import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext';


function Header() {
  const {userInfo,setUserInfo} = useContext(UserContext)
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then (response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })
  },[]);

  function logout (){
    fetch('http://localhost:4000/logout',{
      credentials:'include',
      method:'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
  
  return (
    <div>
        <header>
            <Link to="/" className='logo'>Cars Blog</Link>
              <nav>
                  {username && (
                    <>
                    <samp>Hello , {username}</samp>
                    <Link to='/create'>Create a New Article</Link>
                    <a onClick={logout}>Logout</a>
                    </>
                  )}
                  {!username && (
                    <>
                     <Link to="/login">Login</Link>
                     <Link to="/register">Register</Link>
                     </>
                  )}
              </nav>
        </header>
    </div>
  )
}

export default Header
