import React, { useState } from 'react';
import Therapist from './Therapist';

const TherapistWelcome = () => {
  const [data, setData] = useState(null);

  return (
    <div>
      <Therapist></Therapist>
      
      Welcome area
    </div>

  );
};

export default TherapistWelcome;