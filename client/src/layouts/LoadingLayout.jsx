import React from 'react';
import './sass/loading-layout.sass';
import LinearProgress from 'material-ui/LinearProgress';

const LoadingLayout = () => (
  <div className="loading-layout">
    <div className='loading-layout-child'>
    <img src='/img/MARCA_CRODITY.png' height={'60vh'}/>
    </div>
    <div className='loading-layout-child linear-progress'>
      <LinearProgress
        mode="indeterminate"
        color="#ffca43"/>
      </div>
  </div>
);

export default LoadingLayout;
