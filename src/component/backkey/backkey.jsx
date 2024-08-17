import "./backkey.css"
import { useState } from "react";
import WhatsAppButton from 'react-whatsapp';

const BackKey=()=>{

    const [scrolled, setScrolled] = useState(false)
    // Listen for the scroll event
    window.addEventListener("scroll", function () {
        // Check the scroll position
        if (window.scrollY > 500) {
            // Add the "scrolled" class to the header
            setScrolled(true)
            // header.style.backgroundColor = "white"
            // console.log("scrollling");
            // header.className.add("scrolled");
        } else {
            setScrolled(false)

            // Remove the "scrolled" class from the header
            // header.className.remove("scrolled");
        }
    });
    return<>
    
    <a href="#" className={scrolled ? "btn btn-lg btn-primary btn-lg-square back-to-top scroll" : "btn btn-lg-square"}>
  <i className="bi bi-arrow-up" />
</a>

</>
}
export default BackKey;