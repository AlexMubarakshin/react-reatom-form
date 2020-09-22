import { http } from 'services/api';

interface Payment {
  sum: number;
  cardNo: string;
}

interface PaymentResponse {
  code: number;
  message: string;
}

export async function createPayment(payment: Payment) {
  // TODO: handling error
  const data = await http<PaymentResponse>(
    new Request('/payment', {
      method: 'POST',
      body: JSON.stringify({
        sum: payment.sum,
        card_no: payment.cardNo,
      }),
    }),
  );

  return data;
}
