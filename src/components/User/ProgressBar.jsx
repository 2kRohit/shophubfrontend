import React from 'react';

const ProgressBar = ({ currentStep }) => {
    const steps = ['Cart', 'Place Order', 'Payment'];

    return (
        <div className="progress-container">
            {steps.map((step, index) => (
                <div key={index} className={`progress-step ${currentStep >= index + 1 ? 'completed' : ''}`}>
                    <span className="progress-icon">{index + 1}</span>
                    <span className="progress-label">{step}</span>
                </div>
            ))}
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}></div>
            </div>
        </div>
    );
};

export default ProgressBar;
