import React from "react"

class Footer extends React.Component {
    render() {

        return (

<footer className="bg-white py-10 text-center text-sm">
	<span >©KWALY - {new Date().getYear() + 1900}</span>

</footer>


        );
    }
}

export default Footer
