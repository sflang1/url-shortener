import React from 'react';
import { RecoilRoot } from 'recoil';
import Routes from './Routes';
import RecoilExternalWrapper from './store/RecoilExternalWrapper';

const App = () => {
  return (
    <RecoilRoot>
      <Routes />
      <RecoilExternalWrapper />
    </RecoilRoot>
  )
}

export default App;