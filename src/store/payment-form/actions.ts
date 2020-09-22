import { declareAction } from '@reatom/core';
// import { createPayment } from 'services/api/payment';
import { PaymentStatusCode, PaymentFormData } from './types';

export const paymentRequest = declareAction('payment request');
export const paymentSuccess = declareAction<PaymentStatusCode>('payment success');
export const paymentFail = declareAction<Error>('payment fail');

export const executePayment = declareAction<PaymentFormData>(
  async (paymentFormData: PaymentFormData, { dispatch }) => {
    dispatch(paymentRequest());

    console.log('Sending payment-form data:', paymentFormData);
    try {
      // const response = createPayment({});
      // emulate http request
      setTimeout(() => {
        dispatch(paymentSuccess(0));
      }, 2000);
    } catch (err) {
      dispatch(paymentFail(err));
    }
  },
);
