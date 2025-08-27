import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

import useOutsideClick from "../hooks/useOutsideClick";

import { HiXMark } from "react-icons/hi2";

const ModalContext = createContext();

function Modal({ children }) {
    const [openName, setOpenName] = useState('');

    const close = () => setOpenName('');
    const open = setOpenName;

    return <ModalContext.Provider
            value={{
                openName,
                open,
                close,
            }}
        >
        {children}
    </ModalContext.Provider>
}

function Open({ children, opens: opensWindowName}) {
    const { open } = useContext(ModalContext);

    if(typeof children !== "object") throw new Error('children passed to this component has to be an HTML element object');

    return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name, styles = {} }) {
    const {openName, close} = useContext(ModalContext);

    const ref = useOutsideClick(close);

    if (name !== openName) return null;

    const Element = <div className="fixed top-0 left-0 w-full h-screen bg-[#fef3c611] backdrop-blur-sm z-[1000] transition-all duration-500">
            <div style={styles} className="fixed top-1/2 left-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-amber-300 py-[3.2rem] px-[4rem] text-white shadow-2xl transition-all duration-500 max-h-[90%] max-w-[90%] min-w-[300px]" ref={ref}>
                <button className="absolute top-[1.2rem] right-[1.9rem] translate-x-[0.8rem] rounded-sm border-none p-[0.4rem] transition-all duration-200 bg-amber-500 hover:bg-amber-700 cursor-pointer" onClick={close}>
                    <HiXMark />
                </button>

                <div>{cloneElement(children, {onClose: close})}</div>
            </div>
        </div>;

    return createPortal(Element, document.body);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;