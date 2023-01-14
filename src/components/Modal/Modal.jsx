function Modal({children,open}){
    return(
        <div className="fixed inset-0 bg-slate-800 z-40 hidden">
            {children}
            {open}
        </div>
    )

}
export default Modal