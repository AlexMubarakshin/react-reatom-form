import { declareAction } from '@reatom/core';
// import { createPayment } from 'services/api/payment';
import { PaymentStatusCode } from 'store/payment-form/types';

export const paymentRequest = declareAction('payment request');
export const paymentSuccess = declareAction<PaymentStatusCode>('payment success');
export const paymentFail = declareAction<Error>('payment fail');

export const executePayment = declareAction(async (_, { dispatch }) => {
  dispatch(paymentRequest());

  try {
    // const response = createPayment({});
    // emulate http request
    setTimeout(() => {
      dispatch(paymentSuccess(0));
    }, 2000);
  } catch (err) {
    dispatch(paymentFail(err));
  }
});
