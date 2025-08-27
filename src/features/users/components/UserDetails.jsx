

export default function UserDetails({user}) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-1/2">
                <img src={`${import.meta.env.VITE_API_URL}/${user.avatar}`} alt={user.name} className="w-full rounded-full" />
            </div>

            <div className="text-black w-full flex flex-col gap-2">
                <p>نام کاربر: {user.fullName}</p>
                <p>
                    عضو {user.departments.length > 1 ? 'دپارتمان‌های' : 'دپارتمان'}
                    {
                        user.departments?.map(dep => (
                            <span className="camma" key={dep}>{' ' + dep}</span>
                        ))
                    }
                </p>
                <p>{user.isActive ? 'کاربر فعال و دارای دسترسی می‌باشد' : 'این کاربر توسط مدیر سیستم غیر فعال شده است'}</p>
                <p>
                    دارای {user.roles.length > 1 ? 'نقش‌های' : 'نقش'}
                    {
                        user.roles?.map(role => (
                            <span className="camma" key={role}>{' ' + role}</span>
                        ))
                    }
                </p>
                { user.personnelCode &&
                    <p>کد پرسنلی: {user.personnelCode}</p>
                }
                { user.nationalCode &&
                    <p>کد ملی: {user.nationalCode}</p>
                }
                { user.phoneNumber &&
                    <p>شماره تلفن: {user.phoneNumber}</p>
                }
                { user.roomLocation &&
                    <p>محل اتاق: {user.roomLocation}</p>
                }                
            </div>
        </div>
    );
}