import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import useOutsideClick from '../hooks/useOutsideClick';
import { HiEllipsisVertical } from "react-icons/hi2";

const MenusContext = createContext();

function Menus({ children }) {
    const [openID, setOpenID] = useState('');
    
    // state برای نگهداری المنت‌های مرجع (دکمه) و پاپ‌آپ (لیست)
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);

    // هوک usePopper برای محاسبه موقعیت
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom-end', // منو را پایین و در انتهای دکمه نمایش بده
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8], // فاصله عمودی ۸ پیکسل از دکمه
                },
            },
        ],
    });

    const close = () => setOpenID('');
    const open = (id) => setOpenID(id);

    return (
        <MenusContext.Provider
            value={{
                openID,
                open,
                close,
                setReferenceElement, // تابع برای تنظیم دکمه
                setPopperElement,    // تابع برای تنظیم لیست
                styles,              // استایل‌های محاسبه شده توسط popper
                attributes,          // اتریبیوت‌های لازم برای popper
            }}
        >
            {children}
        </MenusContext.Provider>
    );
}

function Toggle({ id }) {
    const { openID, open, close, setReferenceElement } = useContext(MenusContext);

    function handleClick(e) {
        e.stopPropagation();
        openID === '' || openID !== id ? open(id) : close();
    }

    // ما از ref={setReferenceElement} برای اتصال دکمه به Popper استفاده می‌کنیم
    return (
        <button
            ref={setReferenceElement}
            className="border-none p-[0.2rem] rounded-sm transition-all hover:bg-amber-300 *:w-7 *:h-7 cursor-pointer"
            onClick={handleClick}
        >
            <HiEllipsisVertical />
        </button>
    );
}

function List({ id, children }) {
    const { openID, close, setPopperElement, styles, attributes } = useContext(MenusContext);
    
    // ref برای useOutsideClick
    const ref = useOutsideClick(close, false);

    // ترکیب دو ref در یک تابع
    const handleSetPopperElement = (element) => {
        setPopperElement(element);
        ref.current = element;
    };

    if (openID !== id) return null;

    return createPortal(
        <ul
            ref={handleSetPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="bg-amber-300 rounded-md shadow-lg z-50" // z-index برای روی همه قرار گرفتن
        >
            {children}
        </ul>,
        document.body
    );
}

function Button({ children, icon, onClick, styles }) {
    const { close } = useContext(MenusContext);

    function handleClick() {
        onClick?.();
        close();
    }

    return (
        <li className="list-none" style={styles}>
            <button
                className="w-full text-left border-none px-4 py-2 text-sm text-gray-700 transition-all flex items-center gap-4 justify-around bg-amber-300 hover:bg-amber-400 cursor-pointer rounded-md active:scale-[0.99]"
                onClick={handleClick}
            >
                {icon}
                <span>{children}</span>
            </button>
        </li>
    );
}

// Menu کامپوننت ساده‌ای است که فقط children را رندر می‌کند و نیازی به context ندارد
function Menu({ children, position = 'end' }) {
    return <div className={`flex items-center justify-${position}`}>{children}</div>;
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;