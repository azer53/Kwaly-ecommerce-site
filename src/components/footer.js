import React from "react"
import { Link } from "gatsby"
class Footer extends React.Component {
    render() {

        return (

<footer className="bg-white py-10 text-center text-sm">
	<span >©KWALY - {new Date().getYear() + 1900}</span>
    <div className="my-4 text-center">
      <Link to="/termsandconditions">Terms & Conditions</Link>
    </div>
</footer>



        );
    }
}

export default Footer
