import { Link } from "gatsby"
import React , {useContext, useState} from "react"
import KwalyLogo from "./images/kwalyLogo"
import Cart from "./cart"
import { GlobalStateContext } from "../context/GlobalContextProvider"

function Navigation(){

    const state = useContext(GlobalStateContext)
    const [isCartExpanded, setIsCartExpanded] = useState(false);
    // const [isHamburgerExpanded, setIsHamburgerExpanded] = useState(false);

    return (
        <div>
            <nav className="toggleColour" id="header">

                <div className="mx-auto w-1/6 mt-10 lg:w-1/12">
                    <Link to="/"> <KwalyLogo /></Link>
                </div>
                {/* <div className="block lg:hidden">
                    <button onClick={() => setIsHamburgerExpanded(!isHamburgerExpanded)} className="flex items-center px-3 py-2 border rounded text-gray-800 border-gray-400 hover:text-gray-500 hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div> */}
                {/* <div id="nav-content" className={`${isHamburgerExpanded ? `block` : `hidden`} w-full block flex-grow lg:flex lg:items-center lg:w-auto mt-8`}> */}
                
                <div id="nav-content" className="w-full block flex-grow lg:flex lg:items-center lg:w-auto mt-8">
                    <div className="text-sm lg:flex-grow flex justify-center">
                        <Link to={`/shop`} activeClassName="border-b-2 mt-1" href="#responsive-header" className="pb-1 block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-500 mx-3 lg:mx-4">
                            SHOP
      </Link>
                        <Link to={`/brand`} activeClassName="border-b-2 mt-1" className="pb-1 block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-500 mx-3 lg:mx-4">
                            BRAND
      </Link>
                        <Link to={`/page-2`} activeClassName="border-b-2 mt-1" className="pb-1 block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-500 mx-3 lg:mx-4">
                            SOCIAL
      </Link>
                        <button onClick={() => setIsCartExpanded(!isCartExpanded)} className="pb-1 block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-500 mx-3 lg:mx-4 outline-none">CART<span className={`${state.cart.items.length > 0 ? `inline` : `hidden`} rounded-full bg-indigo-200 uppercase px-2 py-1 text-xs font-bold ml-1`}>{state.cart.totalItems}</span></button>
                        <div className={`${isCartExpanded ? `block` : `hidden`}`}>
                            <Cart isCartExpanded={() => { setIsCartExpanded(false)}}></Cart>
                        </div>
                    </div>

                </div>

            </nav>
        </div>

    );
}
export default Navigation;
