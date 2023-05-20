import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';



//control circle with scrolly 
const Circle: React.FC = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const maxScrollPos = document.body.scrollHeight - window.innerHeight;
      const percent = Math.round((currentScrollPos / maxScrollPos) * 100);
      setPercent(percent);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


//circle style
  return (
    <div>
      <Progress type="circle" percent={percent} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex:"-2" }} />
      
    </div>
  );
};

export default Circle;