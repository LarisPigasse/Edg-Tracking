import { useState } from 'react'

const Tooltip = ({ text, children, position = 'top' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const positionClasses = {
    top   : 'mb-1 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2',
    bottom: 'mt-1 top-full left-1/2 transform -translate-x-1/2 translate-y-2',
    right : 'mr-5 top-1/2 right-full transform translate-x-2 translate-y-[-50%]',
    left  : 'ml-5 top-1/2 left-full transform -translate-x-2 translate-y-[-50%]',
  }
  const arrowClasses = {
    top    : `after:left-1/2 after:top-[100%]     after:-translate-x-1/2  after:border-t-black after:border-x-transparent after:border-b-transparent`,
    bottom : `after:left-1/2 after:bottom-[100%]  after:-translate-x-1/2  after:border-b-black after:border-x-transparent after:border-t-transparent`,
    left   : `after:right-[100%] after:top-1/2    after:-translate-y-1/2  after:border-r-black after:border-y-transparent after:border-l-transparent`,
    right  : `after:left-[100%] after:top-1/2     after:-translate-y-1/2  after:border-l-black after:border-y-transparent after:border-r-transparent`
  }

  return (

    <div className="flex flex-row">
      <div className="relative ">
        <div
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {children}
        </div>
        {showTooltip && (
          <div className={` absolute z-10 p-2 px-4 text-white bg-black rounded-md ${positionClasses[position]}`}>
            <div className={`after:content-[''] after:absolute after:border-8 ${arrowClasses[position]}`}></div>
            {text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tooltip