import React from 'react';

export default function CurrentTime() {
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div>
      <p>{formattedTime}</p>
    </div>
  );
}





