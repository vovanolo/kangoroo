// import styles from "./Navbar.module.css"
import logo from '../../images/logo2.png'
import list from "../../images/List.png";
import "./Navbar.css";

import { buttons } from "./buttons"

function Navbar() {
    return ( 
        <header className="fixed top-0 left-0 right-0 bg-gray-400 z-30">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className='bg-white px-4 py-2 rounded-full'>
                <img className='logo' src={logo} alt="logo"/>
                </div>
                <nav className="hidden lg:flex gap-10 text-3xl">
                    {buttons.map(({ key, label, to }) => (
                        <a key={key} className="text-yellow-400 hover:text-white transition-colors" href={to}>{label}</a>
                    ))}
                </nav>
                <div className="dropdown block lg:hidden">
                <button>
                    <img src={list} alt="" className='w-16 h-16 hover'/>
                </button>
                <ul className='list'>
                {buttons.map(({ key, label, to }) => (
                    <li key={key} >
                        <a className="text-yellow-400 hover:text-white transition-colors" href={to}>{label}</a>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
        </header>
     );
}

export default Navbar;