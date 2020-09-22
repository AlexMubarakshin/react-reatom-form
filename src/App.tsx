import React from 'react';
import { combine, createStore } from '@reatom/core';
import { context } from '@reatom/react';
import { connectReduxDevtools } from '@reatom/debug';
import { Container } from '@material-ui/core';

import PaymentForm from 'components/PaymentForm';
import { paymentAtom } from 'store/payment-form/atoms';

const App: React.FC = () => {
  const store = createStore(combine([paymentAtom]));
  React.useEffect(() => connectReduxDevtools(store), []);

  return (
    <context.Provider value={store}>
      <div className="App">
        <Container maxWidth="sm">
          <PaymentForm />
        </Container>
      </div>
    </context.Provider>
  );
};

export default App;
