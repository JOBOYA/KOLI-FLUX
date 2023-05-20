//loader  component*/
import React from 'react';
import './loader.css';

const Loader: React.FC = () => {
    return (
        <div className="loader">
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;

