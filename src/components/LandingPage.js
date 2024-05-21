import React, { useEffect } from 'react';
import LandinPageWalpaper from "../Assets/Images/LandinPageWalpaper.jpg"
import { useSelector } from 'react-redux';

const LandingPage = () => {
  const { status } = useSelector((state) => state.userReducer);

  return (
    <div>
       {status === 'succeededRegistration' && <h5 style={{marginTop:2,marginBottom:2,color:"#46B980"}}> Registered Details SuccessFully</h5>}
      <img src={LandinPageWalpaper} alt="Landing Walpaper" width="100%" height="100%"/>
      </div>
  )
}

export default LandingPage