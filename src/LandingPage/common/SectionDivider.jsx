import React from "react";
import sobekan from "/images/sobekan-nav.png";

const SectionDivider = ({ direction = "up" }) => {
    return (
        <div className={`w-full overflow-hidden`}>
            <img 
            src={sobekan} 
            alt="Section Divider"
            className={`w-full ${direction === "down" ? "rotate-180" : ""}`} />
        </div>
    )
}

export default SectionDivider;