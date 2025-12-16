import React, { useEffect, useState } from 'react';

const pricePerDay = 1000; // example

const getTotalPrice = (startStr, endStr, pricePerDay) => {
  if (!startStr || !endStr || !pricePerDay) return 0;

  const start = new Date(startStr);
  const end = new Date(endStr);

  if (end <= start) return 0;

  const days = Math.ceil(
    (end - start) / (1000 * 60 * 60 * 24)
  );

  return days * pricePerDay;
};

const Footer = () => {
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  console.count('Footer rendered');

  useEffect(() => {
   
    const price = getTotalPrice(
      pickupDate,
      returnDate,
      pricePerDay
    );

    setTotalPrice(price);
      console.count('Footer useeffect rendered');
  }, [pickupDate, returnDate]); 

  return (
    <div>
      <input
        type="date"
        onChange={e => setPickupDate(e.target.value)}
      />

      <input
        type="date"
        onChange={e => setReturnDate(e.target.value)}
      />

      <p>Pickup Date: {pickupDate}</p>
      <p>Total Price: {totalPrice}</p>
    </div>
  );
};

export default Footer;
