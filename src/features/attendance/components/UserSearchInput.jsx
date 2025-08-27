import { useState, useEffect } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { searchUsers as searchUsersApi } from '../../../services/apiUsers';

function useSearchUsers(searchTerm) {
    const { data: users, isLoading } = useQuery({
        queryKey: ['users', 'search', searchTerm],
        queryFn: () => searchUsersApi( searchTerm ),
        enabled: !!searchTerm,
    });
    return { users: users, isLoading };
}

function UserSearchInput({ selectedUser, onSelectUser, setShowError }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const { users, isLoading } = useSearchUsers(debouncedSearchTerm);

    useEffect(() => {
        if (searchTerm !== selectedUser?.label) {
            onSelectUser(null);
        }
    }, [searchTerm, selectedUser, onSelectUser]);

    const handleSelect = (user) => {
        onSelectUser({ value: user._id, label: user.fullName });
        setSearchTerm(user.fullName);
        setShowResults(false);
    };

    return (
        <div className="relative col-span-3">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowResults(true);
                    setShowError(false);
                }}
                placeholder="نام کاربر را جستجو کنید..."
                className="w-full p-2 border-2 rounded outline-none bg-amber-400"
                name='user'
            />
            { isLoading && <div className='loaderMini'></div> }

            {showResults && debouncedSearchTerm && (
                <ul className="absolute top-full left-0 right-0 bg-white border-2 border-t-0 rounded-b-md shadow-lg z-10 max-h-60 overflow-y-auto">
                {users?.length > 0 ? users.map(user => (
                    <li
                        key={user._id}
                        onClick={() => handleSelect(user)}
                        className="p-2 hover:bg-amber-200 cursor-pointer transition-all"
                    >
                        <p className="font-semibold">{user.fullName}</p>
                        <p className="text-xs text-gray-500">
                            {user.personnelCode ? `کد پرسنلی: ${user.personnelCode}` : `کد ملی: ${user.nationalCode}`}
                        </p>
                    </li>
                )) : !isLoading && <li className='p-2'>کاربری یافت نشد.</li>}
                </ul>
            )}
        </div>
    );
}

export default UserSearchInput;