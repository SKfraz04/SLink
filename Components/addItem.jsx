import React, { useEffect } from 'react';
import { GiStripedSun } from 'react-icons/gi';

const PlusComponent = () => {
  useEffect(() => {
    const plus = document.getElementById('plus');
    const plusToggle = () => {
      plus.classList.toggle('plus--active');
    };

    plus.addEventListener('click', plusToggle);

    return () => {
      plus.removeEventListener('click', plusToggle);
    };
  }, []);

  return (
    <div className="centered">
      <div className="plus" id="plus">
        <div className="plus__line plus__line--v">
          <a href="#" className="plus__link "><GiStripedSun /></a>
        </div>
        <div className="plus__line plus__line--h"></div>
      </div>
    </div>
  );
};

export default PlusComponent;
