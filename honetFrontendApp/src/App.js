import logo from './download.png';
import './App.css';
import {getlocation}  from './services/getlocation'
import {getOutletNearby}  from './services/getNearbyOutlet'

import React, { useState } from 'react';

function App() {
  const [address, setaddress] = useState('');
  const [outlet,setOutlet]=useState(null);
  const onSubmit = async() => {
   let res= await getlocation(address)
   res= await getOutletNearby(res.features[0].center[0],res.features[0].center[1])
   setOutlet(res.outlet)
    console.log(res.outlet)

  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Enter your location to search for outlet
        </p>
        <input value={address} onChange={e => setaddress(e.target.value)} type="text"/>
        <button  onClick={async () => {
                      await onSubmit();
                      // handleReset();
                    }}>Search Outlet</button>
          <p>
            Your near by outlet is {outlet?.area_name}
        </p>
      </header>
    </div>
  );
}

export default App;
