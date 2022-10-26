// import styles from "./Navbar.module.css"
import logo from '../../images/logo.png'

import { buttons } from "./buttons"

function Navbar() {
    return ( 
        <header className="fixed top-0 left-0 right-0 bg-gray-400 z-30">
            <div className="container mx-auto flex items-center justify-between p-4">
                <img src={logo} alt="logo"/>
                <nav className="hidden lg:flex gap-10 text-3xl">
                    {buttons.map(({ key, label, to }) => (
                        <a key={key} className="text-yellow-400 hover:text-white transition-colors" href={to}>{label}</a>
                    ))}
                </nav>
                <button className="block lg:hidden">
                    Sample
                </button>
            </div>
        </header>
     );
}

export default Navbar;