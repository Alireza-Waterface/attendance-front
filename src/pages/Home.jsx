import usePublicUsers from '../features/users/hooks/usePublicUsers';

import Pagination from '../ui/Pagination';
import Search from '../ui/Search';

import { FaRegCircleUser } from "react-icons/fa6";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { FaRegQuestionCircle } from "react-icons/fa";

function Home() {
	const { users, isGettingUsers, pagination } = usePublicUsers();

	return (
		<div className='grid grid-cols-4 gap-2'>
			<h1 className='text-center text-2xl col-span-full'>وضعیت حضور و اطلاعات کارکنان</h1>

			<div className='col-span-full my-2 flex items-center justify-center bg-amber-100 py-2'>
				<Search />
			</div>

			{ isGettingUsers && <div className="loader"></div> }
			{ !isGettingUsers && !users?.length && <p className="text-center col-span-full">کاربری جهت نمایش یافت نشد</p> }
			{ !isGettingUsers && users?.length > 0 &&
				users?.map(user => (
					<div key={user._id} className='flex flex-col gap-2 bg-gray-300 rounded-sm'>
						<div className='w-1/2 mx-auto pt-2'>
							<img
								src={`${import.meta.env.VITE_API_URL}/${user.avatar}`}
								alt={user.fullName}
								className="w-full rounded-full object-cover aspect-square"
							/>
						</div>

						<div className='p-2 flex flex-col gap-1 text-black'>
							<p className='flex items-center gap-2 pr-1 text-lg'>
								<FaRegCircleUser size={18} color='oklch(66.6% 0.179 58.318)' />
								{ user.fullName }
							</p>
							<p className='flex items-center gap-2 pr-1 text-sm'>
								<FaRegQuestionCircle size={18} color='oklch(66.6% 0.179 58.318)' />
								{ user.presenceStatus }
							</p>
							{ user.roomLocation &&
								<p className='flex items-center gap-2 text-sm'>
									<IoLocationOutline size={24} color='oklch(66.6% 0.179 58.318)' />
									{user.roomLocation}
								</p>
							}
							{ user.phoneNumber &&
								<a className='flex items-center gap-2 pr-1 text-amber-600 w-fit' href={`tel:+98${user.phoneNumber.slice(1, 11)}`}>
									<IoCallOutline size={19} color='oklch(66.6% 0.179 58.318)' />
									{user.phoneNumber}
								</a>
							}
						</div>
					</div>
				))
			}

			<Pagination pagination={pagination} isLoading={isGettingUsers} length={users?.length} />
		</div>
	)
}

export default Home;