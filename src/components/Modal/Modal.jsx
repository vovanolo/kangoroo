function Modal({children,open}){
    const classes = ['fixed', 'inset-0', 'bg-slate-800','z-40']
    if (!open){
        classes.push('hidden')
    }
    return(
        <div className={classes.join(" ")}>
            {children}
        </div>
        
    )

}
export default Modal