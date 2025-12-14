import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// Generate a unique session ID for the user
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('visitor_session_id');
  
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('visitor_session_id', sessionId);
  }
  
  return sessionId;
};

const VisitorTracker = ({ backendUrl }) => {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const sessionId = getSessionId();
        const page = location.pathname;

        await axios.post(`${backendUrl}/api/analytics/track`, {
          page,
          sessionId
        });

        console.log('✅ Visit tracked:', page);
      } catch (error) {
        // Silent fail - don't disrupt user experience
        console.log('Analytics tracking failed:', error.message);
      }
    };

    // Track on route change
    trackVisit();
  }, [location, backendUrl]); // Re-run when location changes

  return null; // This component doesn't render anything
};

export default VisitorTracker;