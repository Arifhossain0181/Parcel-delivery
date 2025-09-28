import React, { useState } from 'react';
// Import NavLink from react-router-dom
import { NavLink } from 'react-router';

const QUestion = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
       <div className=''>
         <div className='my-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-black'>

            {/* Top header + 2-line paragraph */}
            <header className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Frequently Asked Questions</h1>
              <p className="text-gray-600">Find quick answers to common questions about our services and policies.</p>
              <p className="text-gray-600">If you can't find what you're looking for</p>
            </header>

            

            {/* FAQ accordion (controlled) */}
            <div className={`collapse collapse-arrow border border-base-300 ${activeIndex === 0 ? 'bg-[#e6f2f3]' : 'bg-base-100'} mb-4`}>
              <input
                type="radio"
                name="my-accordion-2"
                checked={activeIndex === 0}
                onChange={() => setActiveIndex(0)}
              />
              <div className="collapse-title font-semibold">How do I create an account?</div>
              <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
            </div>

            <div className={`collapse collapse-arrow border border-base-300 ${activeIndex === 1 ? 'bg-[#e6f2f3]' : 'bg-base-100'} mb-4`}>
              <input
                type="radio"
                name="my-accordion-2"
                checked={activeIndex === 1}
                onChange={() => setActiveIndex(1)}
              />
              <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
              <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
            </div>

            <div className={`collapse collapse-arrow border border-base-300 ${activeIndex === 2 ? 'bg-[#e6f2f3]' : 'bg-base-100'} mb-4`}>
              <input
                type="radio"
                name="my-accordion-2"
                checked={activeIndex === 2}
                onChange={() => setActiveIndex(2)}
              />
              <div className="collapse-title font-semibold">How do I update my profile information?</div>
              <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
            </div>
            <div className={`collapse collapse-arrow border border-base-300 ${activeIndex === 2 ? 'bg-[#e6f2f3]' : 'bg-base-100'} mb-4`}>
              <input
                type="radio"
                name="my-accordion-2"
                checked={activeIndex === 3}
                onChange={() => setActiveIndex(3)}
              />
              <div className="collapse-title font-semibold">How do I update my profile information?</div>
              <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
            </div>

        <div className=' bg-[#cbeb67] mt-10 p-2 rounded w-32 '> <NavLink className=''> See more FAQ's</NavLink></div>
        </div>
       </div>
    );
};

export default QUestion;