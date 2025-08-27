import { useSearchParams } from "react-router-dom";

import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { MdOutlineLastPage } from "react-icons/md";
import { MdOutlineFirstPage } from "react-icons/md";

export default function Pagination({ pagination, length, isLoading }) {
	const [searchParams, setSearchParams] = useSearchParams();

    function handlePageChange(op) {
		const currentPage = Number(searchParams.get('page')) || 1;
        let newPage;

        switch(op) {
            case 'first': newPage = 1; break;
            case 'prev': newPage = currentPage - 1; break;
            case 'next': newPage = currentPage + 1; break;
            case 'last': newPage = pagination.totalPages; break;
            default: return;
        }

        if (newPage === currentPage || newPage < 1 || newPage > pagination.totalPages) return;
        
        searchParams.set('page', newPage);
        setSearchParams(searchParams);
	}

    return (
        <>
        { !isLoading && length > 0 &&
            <p className="col-span-full text-gray-600 text-sm flex items-center gap-1 my-2">
                نمایش
                <span>{ ((pagination.page - 1) * 10) + 1 }</span>
                تا
                <span>
                    { pagination.page !== pagination.totalPages ? pagination.page * 10 :
                        pagination.page * 10 === pagination.totalDocs ? pagination.page * 10 :
                        pagination.totalDocs
                    }
                </span>
                از
                <span>{pagination.totalDocs}</span>
            </p>
        }

        { !isLoading && pagination.totalPages > 1 &&
            <div className="flex items-center justify-center gap-4 py-2 col-span-full bg-amber-100 rounded-md">
                <button
                    type="button"
                    title="صفحه اول"
                    disabled={pagination.page === 1}
                    onClick={() => handlePageChange('first')}
                    className="bg-amber-300 hover:bg-amber-400 transition-all rounded-sm cursor-pointer py-1 px-2 disabled:cursor-not-allowed disabled:bg-neutral-300"
                >
                    <MdOutlineLastPage size={24} />
                </button>

                <button
                    type="button"
                    title="صفحه قبل"
                    disabled={!pagination.hasPrevPage}
                    onClick={() => handlePageChange('prev')}
                    className="bg-amber-200 hover:bg-amber-300 transition-all rounded-sm cursor-pointer py-1 px-2 disabled:cursor-not-allowed disabled:bg-neutral-300"
                >
                    <GrNext size={18} />
                </button>

                <span>{pagination.page}</span>

                <button
                    type="button"
                    title="صفحه بعد"
                    disabled={!pagination.hasNextPage}
                    onClick={() => handlePageChange('next')}
                    className="bg-amber-200 hover:bg-amber-300 transition-all rounded-sm cursor-pointer py-1 px-2 disabled:cursor-not-allowed disabled:bg-neutral-300"
                >
                    <GrPrevious size={18} />
                </button>

                <button
                    type="button"
                    title="صفحه آخر"
                    disabled={pagination.page === pagination.totalPages}
                    onClick={() => handlePageChange('last')}
                    className="bg-amber-300 hover:bg-amber-400 transition-all rounded-sm cursor-pointer py-1 px-2 disabled:cursor-not-allowed disabled:bg-neutral-300"
                >
                    <MdOutlineFirstPage size={24} />
                </button>
            </div>
        }
        </>
    );
}