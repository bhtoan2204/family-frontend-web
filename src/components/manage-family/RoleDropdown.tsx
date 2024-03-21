"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RoleDropdown = ({ setRole }: { setRole: React.Dispatch<React.SetStateAction<String>> }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('member');

    const roles = ['Family member', 'Mommy', 'Daddy', 'Owner family'];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleRoleSelect = (role: any) => {
        setSelectedRole(role);
        console.log(role)
        if (role === 'Family member') {
            setRole('member');
        } else if (role === 'Mommy') {
            setRole("mom");
        }
        else if (role === 'Daddy') {
            setRole("dad");
        }
        else {
            setRole("owner");
        }

        setIsOpen(false); // Close the dropdown after selection
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="flex flex-row justify-between items-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue "
                    onClick={toggleDropdown}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    {selectedRole}

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 inset-y-0 ml-2 right-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>

                </button>
            </div>

            {isOpen && (
                <ul
                    className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-32 overflow-auto focus:outline-none"
                    tabIndex={-1}

                    role="listbox"
                    aria-labelledby="role-dropdown"
                >
                    {roles.map((role, index) => (
                        <li
                            key={index}
                            className="text-gray-900 text-xs cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                            onClick={() => handleRoleSelect(role)}
                        >
                            <span className="block truncate">{role}</span>
                            {selectedRole === role && (
                                <span className="text-blue-500 absolute inset-y-0 right-0 flex items-center pr-4">

                                    &#10003;
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RoleDropdown;