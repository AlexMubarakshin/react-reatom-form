import React from 'react';
import { combine, createStore } from '@reatom/core';
import { context } from '@reatom/react';
import { connectReduxDevtools } from '@reatom/debug';
import { Container } from '@material-ui/core';

import PaymentForm from 'components/PaymentForm';
import { paymentFormAtom } from 'store/payment-form/atoms';

const App: React.FC = () => {
  const store = React.useMemo(() => createStore(combine([paymentFormAtom])), []);
  React.useEffect(() => connectReduxDevtools(store), []);

  return (
    <div className="App">
      <Container maxWidth="sm">
        <context.Provider value={store}>
          <PaymentForm />
        </context.Provider>
      </Container>
    </div>
  );
};

export default App;
