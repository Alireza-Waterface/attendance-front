import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import UserSearchInput from './UserSearchInput';
import useRecordAttendance from '../hooks/useRecordAttendance';

import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/prime.css";

function RecordAttendanceForm({ onClose }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showError, setShowError] = useState(false);
    const { handleSubmit, reset, control, register } = useForm({
        defaultValues: {
            timestamp: new Date(),
            type: 'check-in',
        },
    });
    const { recordAttendance, isRecording } = useRecordAttendance();

    function onSubmit(data) {
        if (!selectedUser) {
            setShowError(prev => !prev);
            return;
        }
        
        const submissionData = {
            userId: selectedUser.value, // .value همان _id کاربر است
            type: data.type,
            timestamp: new Date(data.timestamp),
        };

        recordAttendance(submissionData, {
            onSuccess: () => {
                reset({ timestamp: new Date() });
                setSelectedUser(null);
                onClose?.();
            }
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
            <h2 className="text-xl font-bold text-center mb-4">ثبت گزارش جدید</h2>
            
            <div className='grid grid-cols-4 items-center'>
                <label className='col-span-1'>کاربر:</label>
                <UserSearchInput
                    selectedUser={selectedUser}
                    onSelectUser={setSelectedUser}
                    setShowError={setShowError}
                />
                { showError && <p className="text-red-600 text-sm mt-2">انتخاب کاربر الزامی است.</p> }
            </div>

            <div className='mt-4 grid grid-cols-4 items-center'>
                <label className='col-span-1'>نوع عملیات:</label>
                <div className="col-span-3 flex gap-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            id="check-in"
                            value="check-in"
                            {...register('type')}
                            className="h-4 w-4 cursor-pointer"
                        />
                        <label htmlFor="check-in" className='cursor-pointer select-none'>ثبت ورود</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            id="check-out"
                            value="check-out"
                            {...register('type')}
                            className="h-4 w-4 cursor-pointer"
                        />
                        <label htmlFor="check-out" className='cursor-pointer select-none'>ثبت خروج</label>
                    </div>
                </div>
            </div>

            <div className='mt-4 grid grid-cols-4 items-center'>
                <label className='col-span-1'>زمان:</label>
                <div className="col-span-3 custom-datepicker-wrapper">
                    <Controller
                        control={control}
                        name="timestamp"
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            formState: { errors },
                        }) => (
                            <>
                            <DatePicker
                                value={value || ''}
                                onChange={date => {
                                    onChange(date)
                                }}
                                className='rmdp-prime'
                                format='HH:mm'
                                calendar={persian}
                                locale={persian_fa}
                                disableDayPicker
                                plugins={[
                                    <TimePicker position='left' hideSeconds />
                                ]}
                            />
                            {errors && errors.checkIn && errors.checkIn.type === "required" && (
                                <span>لطفا تاریخ و ساعت را مشخص کنید</span>
                            )}
                            </>
                        )}
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 absolute bottom-[1.2rem] right-1/2 translate-x-1/2">
                <button type="button" onClick={onClose} className="bg-red-600 px-12 py-2 rounded hover:bg-red-700 transition-all active:translate-y-1 cursor-pointer">
                    انصراف
                </button>
                <button type="submit" disabled={isRecording} className="bg-green-600 text-white px-12 py-2 rounded hover:bg-green-700 transition-all active:translate-y-1 cursor-pointer">
                    {isRecording ? <div className='loaderMini'></div> : ' ثبت گزارش'}
                </button>
            </div>
        </form>
    );
}

export default RecordAttendanceForm;