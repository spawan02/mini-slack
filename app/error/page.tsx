// pages/auth/error.tsx<
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ErrorPage = () => {
    return (
        <div className='bg-gray-900 min-h-screen flex justify-center text-white items-center text-center'>
            <div className='flex flex-col font-medium text-2xl'>
                <h1 className='p-2'>
                    Oops! Something went wrong
                </h1>
                <p className='pb-8'>
                    Unexpected Error
                </p>

                <Button className="bg-blue-400 transition delay-150 duration-700 hover:scale-110 hover:bg-indigo-500 ">
                    <Link href={'/'}>
                        Try again
                    </Link>
                </Button>

            </div>
        </div>
    );
};

export default ErrorPage;
