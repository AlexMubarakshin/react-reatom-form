import { declareAction } from '@reatom/core';
// import { createPayment } from 'services/api/payment';
import { PaymentStatus } from './types';

export const paymentRequest = declareAction('payment request');
export const paymentSuccess = declareAction('payment success');
export const paymentFail = declareAction<Error>('payment fail');

export const executePayment = declareAction(async (_, { dispatch }) => {
  dispatch(paymentRequest());

  try {
    // const response = createPayment({});
    // emulate http request
    dispatch(paymentSuccess());
  } catch (err) {
    dispatch(paymentFail(err));
  }
});
