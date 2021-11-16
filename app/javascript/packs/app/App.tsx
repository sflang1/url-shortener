import React from 'react';
import { RecoilRoot } from 'recoil';
import SessionInfoLoader from './SessionInfoLoader';
import RecoilExternalWrapper from './store/RecoilExternalWrapper';

const App = () => {
  return (
    <RecoilRoot>
      <SessionInfoLoader />
      <RecoilExternalWrapper />
    </RecoilRoot>
  )
}

export default App;