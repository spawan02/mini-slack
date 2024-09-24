// pages/auth/error.tsx
'use client'
import { useRouter } from 'next/navigation';

const ErrorPage = () => {
    const router = useRouter()
    return (
        <div>
            <h1>Error</h1>

            {/* Add a button to go back to the login page */}
            <button onClick={() => router.push('/api/auth/signin')}>Go back to Sign In</button>
        </div>
    );
};

export default ErrorPage;
