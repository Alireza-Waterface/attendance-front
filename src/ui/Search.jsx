import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

export default function Search({placeholder = 'نام کاربر'}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            searchParams.set('search', debouncedSearchTerm);
            searchParams.set('page', 1);
        } else searchParams.delete('search');
        
        setSearchParams(new URLSearchParams(searchParams.toString()));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm]);

    return (
        <div className="col-span-3 flex items-center gap-2 search-users">
            <label htmlFor="search">جستجو: </label>
            <input
                type="text"
                name="search"
                id="search"
                placeholder={placeholder}
                className="w-full py-2 px-3 rounded-md min-w-[300px]"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
    );
}