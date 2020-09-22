export type PaymentStatusCode = 0 | 1;

export interface PaymentState {
  status: 'process' | 'error' | 'success' | null;
  error: string | null;
  statusCode: PaymentStatusCode | null;
}

export interface PaymentFormData {
  sum: number | string;
  cardNo: string;
}
