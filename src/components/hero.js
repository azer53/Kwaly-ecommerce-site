import React from "react"

import { Link } from "gatsby"
import HeroImage from "./images/heroImage"

class Hero extends React.Component {
    render() {

        return (
            <div>
                <div className="pt-12 mx-auto lg:pt-24 lg:w-10/12">

                    <div className="p-8 text-center big-shadow opacity-grey-300 z-10 lg:p-1 lg:float-left lg:absolute lg:mt-48 lg:ml-12">
                        <Link to="/shop" className=""><div className="text-karla-uppercase text-xl hover:text-blue-900 lg:px-16 lg:py-2">
                            <svg className="fill-current text-gray-700 h-4 w-4 inline mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 2h16l-3 9H4a1 1 0 1 0 0 2h13v2H4a3 3 0 0 1 0-6h.33L3 5 2 2H0V0h3a1 1 0 0 1 1 1v1zm1 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" /></svg>
                            SHOP NOW
                        </div>
                        </Link>
                    </div>
                    <HeroImage className="relative z-0" />

                </div>

            </div>

        );
    }
}



export default Hero





