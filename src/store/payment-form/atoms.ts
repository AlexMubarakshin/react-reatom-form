import { declareAtom, combine } from '@reatom/core';
import { paymentRequest, paymentSuccess, paymentFail } from './actions';
import { PaymentStatus } from './types';

export const paymentStatusAtom = declareAtom<PaymentStatus>('paymentStatusAtom', null, (on) => [
  on(paymentRequest, () => 'process'),
  on(paymentSuccess, () => 'success'),
  on(paymentFail, () => 'error'),
]);

export const paymentFormAtom = combine({
  paymentStatusAtom,
});
