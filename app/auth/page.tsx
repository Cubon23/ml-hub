'use client'; 
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase'; 

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<any>(null);

  // Check for active session on load
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  // Handle Registration
  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Success! Please check your email to confirm.');
    }
  };

  // Handle Login
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Login successful!');
      setUser(data.user);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMessage('Logged out successfully.');
  };

  // Logged-In View
  if (user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
        <h2>Welcome to Machine Learning Hub</h2>
        <p>Logged in as: <strong>{user.email}</strong></p>
        <button 
          onClick={handleLogout} 
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Logout
        </button>
      </div>
    );
  }

  // Login/Register View
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
      <h2>Sign In / Register</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '320px' }}>
        <input 
          type="email" 
          placeholder="Enter Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        
        <input 
          type="password" 
          placeholder="Enter Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleLogin} 
            style={{ flex: 1, padding: '12px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
          >
            Login
          </button>
          <button 
            onClick={handleSignUp} 
            style={{ flex: 1, padding: '12px', cursor: 'pointer', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
          >
            Sign Up
          </button>
        </div>
      </div>

      {message && (
        <p style={{ 
          marginTop: '20px', 
          color: message.includes('Success') || message.includes('successful') ? '#2e7d32' : '#d32f2f',
          backgroundColor: message.includes('Success') || message.includes('successful') ? '#e8f5e9' : '#ffebee',
          padding: '10px 20px',
          borderRadius: '4px'
        }}>
          {message}
        </p>
      )}
    </div>
  );
}