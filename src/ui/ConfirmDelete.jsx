function ConfirmDelete({ resourceName = 'resource', onConfirm, disabled = false, onClose }) {
    return (
        <div className="flex flex-col gap-6 text-black">
            <h3 className="text-xl">حذف <span className="text-red-600">{resourceName}</span> از سامانه</h3>
            <p className="text-justify mb-[1.2rem] text-lg">
                آیا از حذف این مورد اطمینان دارید؟ این عمل قابل بازگشت نیست!
            </p>

            <div className="flex justify-start gap-[1.2rem]">
                <button className="border-none rounded-sm transition-all text-center px-8 py-2 bg-green-500 hover:bg-green-600 active:transform-[translateY(3px)] cursor-pointer" disabled={disabled} onClick={onClose}>
                    لغو
                </button>
                <button
                    className="border-none rounded-sm transition-all text-center bg-red-500 px-8 py-2 hover:bg-red-700 active:transform-[translateY(3px)] cursor-pointer"
                    disabled={disabled}
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
                >
                    {disabled ? 'در حال حذف...' : 'حذف'}
                </button>
            </div>
        </div>
    );
}

export default ConfirmDelete;