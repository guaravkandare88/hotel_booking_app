import React, { useState} from "react";
import HashLoader from "react-spinners/HashLoader";




function Loader() {
    let [loading, setLoading] = useState(true);

    return (
        <div className="d-flex justify-content-center">
            <div className="sweet-loading mt-5">
                <HashLoader color='#000' loading={loading} css='' size={150} aria-label="Loading Spinner" />
            </div>
        </div>
    )
};

export default Loader;