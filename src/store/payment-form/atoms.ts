import { declareAtom, combine } from '@reatom/core';
import { paymentRequest, paymentSuccess, paymentFail } from './actions';
import { PaymentState } from './types';

const initialPaymentState: PaymentState = { status: null, error: null, statusCode: null };

export const paymentAtom = declareAtom<PaymentState>(
  'payment',
  initialPaymentState,
  (on) => [
    on(paymentRequest, (state: PaymentState) => ({ ...state, status: 'process' })),
    on(paymentSuccess, (state: PaymentState, statusCode) => ({
      ...state,
      status: 'success',
      statusCode,
    })),
    on(paymentFail, (state: PaymentState) => ({ ...state, status: 'error' })),
  ],
);
