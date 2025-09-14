import useCreateUser from "../hooks/useCreateUser";
import { useDepartments } from "../../departments/hooks/useDepartments";
import { useForm } from "react-hook-form";
import { ROLES } from "../../../utils/constants";

export default function CreateUserForm({ onClose }) {
    const { createUser, isCreatingUser } = useCreateUser();
    const { departments, isLoading: isGettingDeps } = useDepartments();

    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const onSubmit = formData => {
        const preparedData = {
            fullName: formData.fullName,
            departments: formData.departments,
            roles: formData.roles,
            isActive: formData.isActive,
            roomLocation: formData.roomLocation,
            phoneNumber: formData.phoneNumber,
            personnelCode: formData.personnelCode,
            nationalCode: formData.nationalCode,
            avatar: formData.avatar,
            profileSettings: formData.profileSettings,
            password: formData.password
        };
        
        createUser(preparedData, {
            onSuccess: () => {
                onClose?.();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-4 edit-user items-center">
                <label htmlFor="fullName" className="col-span-1">نام کامل: </label>
                <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    disabled={isCreatingUser}
                    className="col-span-3 p-2 rounded-sm"
                    autoComplete="false"
                    { ...register('fullName', {
                        required: 'نام کاربر الزامی است',
                        minLength: {
                            value: 2,
                            message: 'طول نام کاربر کمتر از حد مجاز است'
                        },
                        maxLength: {
                            value: 50,
                            message: 'طول نام کاربر بیش از حد مجاز است'
                        },
                    })
                    }
                />
                {errors?.fullName?.message && <p className="text-red-600 col-span-4 mt-2">{errors?.fullName?.message}</p>}
            </div>

            <div className="flex flex-col">
                <div className="flex gap-4 mt-4">
                    <legend>دپارتمان‌ها:</legend>

                    <div className="grid grid-cols-3 gap-4">
                    { isGettingDeps && <div className="loaderMini"></div> }
                    {
                        !isGettingDeps && departments?.map(dep => (
                            <div className="flex items-center gap-2 justify-end" key={dep._id}>
                                <label htmlFor={dep._id}>{dep.name}</label>
                                <input
                                    type="checkbox"
                                    name="departments"
                                    id={dep._id}
                                    value={dep.name}
                                    disabled={isCreatingUser}
                                    { ...register('departments', {
                                        required: "عضویت در یک دپارتمان الزامی است"
                                    })                                        
                                    }
                                />
                            </div>
                        ))
                    }
                    </div>
                </div>
                
                {errors?.departments?.message && <p className="text-red-600 mt-2">{errors?.departments?.message}</p>}
            </div>

            <div className="flex flex-col">
                <div className="flex gap-4 mt-4">
                    <legend>نقش‌ها:</legend>

                    <div className="grid grid-cols-3 gap-4">
                    {
                        ROLES?.map(role => (
                            <div className="flex items-center gap-2 justify-end" key={role}>
                                <label htmlFor={role}>{role}</label>
                                <input
                                    type="checkbox"
                                    name="roles"
                                    id={role}
                                    value={role}
                                    disabled={isCreatingUser}
                                    { ...register('roles', {
                                        required: "داشتن یک نقش الزامی است"
                                    })                                        
                                    }
                                />
                            </div>
                        ))
                    }
                    </div>
                </div>
                
                {errors?.roles?.message && <p className="text-red-600 mt-2">{errors?.roles?.message}</p>}
            </div>

            <div className="flex gap-4 items-center mt-4">
                <label htmlFor="isActive">دسترسی به سامانه:</label>
                <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    defaultChecked='true'
                    disabled={isCreatingUser}
                    { ...register('isActive') }
                />
                
                {errors?.isActive?.message && <p className="text-red-600">{errors?.isActive?.message}</p>}
            </div>

            <div className="grid grid-cols-4 gap-x-4 items-center mt-4 edit-user">
                <label htmlFor="personnelCode">کد پرسنلی:</label>
                <input
                    type="text"
                    name="personnelCode"
                    id="personnelCode"
                    disabled={isCreatingUser}
                    className="col-span-3 p-2 rounded-sm"
                    { ...register('personnelCode') }
                />
                
                {errors?.personnelCode?.message && <p className="text-red-600 col-span-4 mt-2">{errors?.personnelCode?.message}</p>}
            </div>

            <div className="grid grid-cols-4 gap-x-4 items-center mt-4 edit-user">
                <label htmlFor="nationalCode">کد ملی:</label>
                <input
                    type="text"
                    name="nationalCode"
                    id="nationalCode"
                    disabled={isCreatingUser}
                    className="col-span-3 p-2 rounded-sm"
                    { ...register('nationalCode') }
                />
                
                {errors?.nationalCode?.message && <p className="text-red-600 col-span-4 mt-2">{errors?.nationalCode?.message}</p>}
            </div>

            <div className="grid grid-cols-4 gap-x-4 edit-user items-center mt-4">
                <label htmlFor="password" className="col-span-1">کلمه عبور: </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    disabled={isCreatingUser}
                    className="col-span-3 p-2 rounded-sm"
                    { ...register('password', {
                        required: 'اختصاص کلمه عبور الزامی است',
                        minLength: {
                            value: 8,
                            message: 'حداقل طول کلمه عبور 8 کاراکتر می‌باشد'
                        }
                    }) }
                />
                {errors?.password?.message && <p className="text-red-600 col-span-4 mt-2">{errors?.password?.message}</p>}
            </div>

            <div className="grid grid-cols-4 edit-user items-center mt-4">
                <label htmlFor="roomLocation" className="col-span-1">محل اتاق: </label>
                <input
                    type="text"
                    name="roomLocation"
                    id="roomLocation"
                    disabled={isCreatingUser}
                    className="col-span-3 p-2 rounded-sm"
                    { ...register('roomLocation') }
                />
                {errors?.roomLocation?.message && <p className="text-red-600 col-span-4">{errors?.roomLocation?.message}</p>}
            </div>

            <div className="grid grid-cols-4 edit-user items-center mt-4">
                <label htmlFor="phoneNumber" className="col-span-1">شماره تلفن: </label>
                <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    disabled={isCreatingUser}
                    placeholder="09123456789"
                    className="col-span-3 p-2 rounded-sm"
                    { ...register('phoneNumber', {
                        minLength: {
                            value: 11,
                            message: 'طول شماره تلفن باید 11 رقم باشد - مثال: 09123456789'
                        },
                        maxLength: {
                            value: 11,
                            message: 'طول شماره تلفن باید 11 رقم باشد - مثال: 09123456789'
                        }
                    }) }
                />
                {errors?.phoneNumber?.message && <p className="text-red-600 col-span-4">{errors?.phoneNumber?.message}</p>}
            </div>

            <div className="flex items-center gap-4 mt-16 ">
                <button disabled={isCreatingUser} className="bg-green-500 px-8 py-2 rounded-sm cursor-pointer active:transform-[translateY(3px)] transition-all hover:bg-green-600" type="submit">
                    { isCreatingUser ? <div className="loaderMini"></div> : 'افزودن عضو' }
                </button>
                <button disabled={isCreatingUser} type="button" className="bg-red-400 px-8 py-2 rounded-sm cursor-pointer active:transform-[translateY(3px)] transition-all hover:bg-red-600" onClick={() => onClose?.()}>لغو</button>
            </div>
        </form>
    );
}