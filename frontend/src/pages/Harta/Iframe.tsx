import React from 'react';

export default function IframeComponent() {
  return (
    <iframe
      title="Embedded HTML"
      src='https://waqi.info/#/c/44.438/26.054/14z' // Path to your index.html file in the public directory
      width="100%"
      height="500"
      
    ></iframe>
  );
}

// function App() {
//   return (
//     <div className="App">
//       {/* Other content /}
//       <IframeComponent />
//       {/ Other content */}
//     </div>
//   );
// }

// export default App;