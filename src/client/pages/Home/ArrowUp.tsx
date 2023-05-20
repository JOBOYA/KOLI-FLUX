import React from 'react';
import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './Home.css'



//show hidenn arrow up

const ArrowUp: React.FC = () => {
    const [show, setShow] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="arrowUp">
            {show && (
                <FaArrowUp className="arrowUp__icon" onClick={handleClick} />
            )}
        </div>
    );
};


export default ArrowUp;
//create function FaArrowUp
