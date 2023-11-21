"use client";
import { useEffect, useState } from 'react';
import { useUserAuth } from './_utils/auth-context';

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const { gitHubSignIn, firebaseSignOut } = useUserAuth();

  useEffect(() => {
    // Fetch user data or check authentication status
    const fetchUserData = async () => {
      try {
        const userData = await checkUserAuthentication(); // Function to verify user authentication
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleSignIn = async () => {
    try {
      await gitHubSignIn(); // Sign in with GitHub
    } catch (error) {
      console.error('GitHub sign-in error: ', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(); // Log out the user
    } catch (error) {
      console.error('Sign-out error: ', error);
    }
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    background: '#3498db',
    color: 'white',
    border: 'none',
    margin: '5px',
    cursor: 'pointer',
    display: 'block',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const loginTextStyle = {
    margin: '50px 0', // Adjust vertical margin for "Please log in"
    textAlign: 'center', // Center text horizontally
  };

  return (
    <div style={containerStyle}>
      {user ? (
        <div>
          <p>Welcome, {user.displayName} ({user.email})</p>
          <button onClick={handleSignOut} style={buttonStyle}>Log Out</button>
          <a href="/shopping-list" style={buttonStyle}>Go to Shopping List</a>
        </div>
      ) : (
        <div>
          <p style={loginTextStyle}>Log in</p>
          <button onClick={handleSignIn} style={buttonStyle}>Login with GitHub</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
