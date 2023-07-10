import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      // Add your authentication logic here
      const token = localStorage.getItem('token');
      const isAuthenticated = !!token; // Check if the token exists

      if (!isAuthenticated) {
        // Redirect to the login page or another appropriate route
        router.push('/');
      }
    });

    const token = localStorage.getItem('token');
    const isAuthenticated = !!token; // Check if the token exists

    if (!isAuthenticated) {
      // You can show a loading spinner or a message while authenticating
      return <div>Loading...</div>;
    }

    // Render the wrapped component if the user is authenticated
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
