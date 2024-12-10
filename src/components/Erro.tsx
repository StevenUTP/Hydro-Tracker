import React from 'react';

interface ErrorProps {
    mensaje: string;
}

const Error: React.FC<ErrorProps> = ({ mensaje }) => {
    return (
        <div className="bg-red-500 text-white text-center p-3 uppercase font-bold mb-3 rounded-md">
            <p>{mensaje}</p>
        </div>
    );
};

export default Error;