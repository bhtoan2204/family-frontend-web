import React from 'react'
import { useRouter } from 'next/navigation'; // Assuming you're using React Router for navigation

import { FiCheckCircle } from 'react-icons/fi';
import { Button } from '@/lib/atoms/Button';

const ComponentFinalStep = ({ familyId }: { familyId: String }) => {
    const router = useRouter()
    const handleManageFamily = () => {
        // Redirect to manage family page
        router.push(`/manage/19`);
    };
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <FiCheckCircle className="text-green-500 text-6xl mb-4" />
            <h2 className="text-4xl font-bold font-inter mb-4">Congratulations!</h2>
            <p className="text-center mb-6">Your family has been successfully created.</p>
            <Button
                onClick={handleManageFamily}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
                Manage
            </Button>
        </div>
    );
}

export default ComponentFinalStep