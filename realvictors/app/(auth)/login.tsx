/**
 * Login Screen - Entry point for authentication
 * 
 * Imports MainLoginPage component and connects it with AuthContext
 */

import { MainLoginPage } from '@/components/screens/AuthScreens/Login';
import { useAuth } from '@/contexts/AuthContext';

/**
 * LoginScreen Component
 */
export default function LoginScreen() {
  const { signIn, isLoading } = useAuth();

  /**
   * Handle login completion from MainLoginPage
   */
  const handleLoginComplete = async (email: string, password: string) => {
    console.log('🔐 Login attempt for:', email);
      const result = await signIn(email, password);
    return result;
  };

  return (
    <MainLoginPage 
      onComplete={handleLoginComplete}
      isLoading={isLoading}
    />
  );
}

