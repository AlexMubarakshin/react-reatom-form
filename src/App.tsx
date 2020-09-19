import React from 'react';

import { combine, createStore } from '@reatom/core';
import { context } from '@reatom/react';
import { connectReduxDevtools } from '@reatom/debug';

import { Container, Button, TextField } from '@material-ui/core';

import PaymentForm from 'components/PaymentForm';
// import { playerAtom } from '../../store/player/atoms';

const App: React.FC = () => {
  // const store = React.useMemo(() => createStore(combine([playerAtom])), []);
  // React.useEffect(() => connectReduxDevtools(store), []);

  return (
    <div className="App">
      <Container maxWidth="sm">
        <PaymentForm />
      </Container>
      {/* <context.Provider value={store}> */}

      {/* </context.Provider> */}
    </div>
  );
};

export default App;
