import Link from 'next/link';

export default function LandingPage() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      {/* Mandatory Requirement: Application Title */}
      <h1>Machine Learning Hub</h1>
      
      {/* Mandatory Requirement: Short Description */}
      <p style={{ maxWidth: '500px', textAlign: 'center' }}>
        A simple integrated platform for managing machine learning resources, 
        designed for students of System Integration and Architecture.
      </p>
      
      {/* Mandatory Requirement: Button/Link to Login */}
      <Link href="/auth">
        <button style={{ 
          padding: '10px 20px', 
          fontSize: '1rem', 
          cursor: 'pointer', 
          backgroundColor: '#0070f3', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px' 
        }}>
          Get Started
        </button>
      </Link>
    </main>
  );
}