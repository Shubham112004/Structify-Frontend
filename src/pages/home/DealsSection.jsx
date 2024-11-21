import React, { useState, useEffect } from 'react';
import dealsImg from '../../assets/deals.png';

const DealsSection = () => {
    // Initialize state for countdown timer
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 10,
        mins: 5,
        secs: 12,
    });

    // Countdown logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                const { days, hours, mins, secs } = prevTime;

                // Calculate the new time
                if (secs > 0) return { ...prevTime, secs: secs - 1 };
                if (mins > 0) return { ...prevTime, mins: mins - 1, secs: 59 };
                if (hours > 0) return { ...prevTime, hours: hours - 1, mins: 59, secs: 59 };
                if (days > 0) return { days: days - 1, hours: 23, mins: 59, secs: 59 };

                // When countdown reaches zero, stop the timer
                clearInterval(timer);
                return { days: 0, hours: 0, mins: 0, secs: 0 };
            });
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup timer on component unmount
    }, []);

    return (
        <section className="section__container deals__container">
            <div className="deals__image">
                <img src={dealsImg} alt="Deals" />
            </div>
            <div className="deals__content">
                <h5>Get Up To 20% Discount</h5>
                <h4>Deals of This Month</h4>
                <p>
                    "Exclusive Deals of the Month – Grab Unbeatable Discounts Before They're Gone!"
                </p>
                <div className="deals__countdown flex-wrap">
                    <div className="deals__countdown__card">
                        <h4>{String(timeLeft.days).padStart(2, '0')}</h4>
                        <p>Days</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>{String(timeLeft.hours).padStart(2, '0')}</h4>
                        <p>Hours</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>{String(timeLeft.mins).padStart(2, '0')}</h4>
                        <p>Mins</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>{String(timeLeft.secs).padStart(2, '0')}</h4>
                        <p>Secs</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealsSection;
