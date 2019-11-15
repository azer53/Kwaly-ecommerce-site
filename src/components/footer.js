import React from "react"
import { Link } from "gatsby"
import VisaLogo from "./images/visaLogo"
import MasterCardLogo from "../images/mastercardLogo.svg"
import BancontactLogo from "../images/bancontact-logo.svg"

class Footer extends React.Component {
  render() {
    return (
      <footer className="bg-gray-100 border-t-2 mt-6 py-10 text-center text-sm">
        <span>©KWALY - {new Date().getYear() + 1900}</span>
        <div className="my-4 text-center">
          <Link to="/termsandconditions" className="hover:underline">Terms & Conditions</Link>
        </div>
        <div className="p-8">
        <span className="text-gray-600 italic">We Accept:</span>
          <div className="flex justify-center">
            <div className="w-24">
              <VisaLogo></VisaLogo>
            </div>
            <div className="w-24">
              <MasterCardLogo></MasterCardLogo>
            </div>
            <div className="w-24">
              <BancontactLogo></BancontactLogo>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
