import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Formik, Field, FormikHelpers, FormikState, FormikValues } from 'formik';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Typography,
  Box,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { useAction, useAtom } from '@reatom/react';
import { executePayment } from 'store/payment-form/actions';
import { paymentAtom } from 'store/payment-form/atoms';
import { PaymentFormData } from 'store/payment-form/types';

import s from './PaymentForm.css';

// TODO: улучшить типизацию

const PaymentFormValidationSchema = Yup.object().shape({
  sum: Yup.number()
    .required('Поле обязательно для заполнения')
    .positive('Сумма должна быть больше 0')
    .integer('Введите целочисленное значение')
    .min(100, 'Сумма должна быть > 100')
    .max(1000, 'Сумма должна быть < 1000')
    .typeError('Введите целочисленное значение'),
  cardNo: Yup.string()
    .required('Поле обязательно для заполнения')
    .min(16, 'Неверно введен номер карты')
    .required('Поле обязательно для заполнения'),
});

const initialValues: PaymentFormData = {
  sum: '',
  cardNo: '',
  // cardExpireDate: '',
  // cardCvv: 0,
};

const PaymentForm: React.FC = () => {
  const executePaymentAction = useAction(executePayment);
  const handleSubmitPayment = React.useCallback((paymentData: PaymentFormData) => {
    // TODO: type for payment data
    executePaymentAction(paymentData);
  }, []);
  const payment = useAtom(paymentAtom);

  useEffect(() => {
    if (payment.status === 'success') {
      alert(`Payment status: ${payment.status}`);
    }
    return;
  }, [payment]);

  return (
    <>
      <Typography variant="h4" component="h4" gutterBottom className={s.title}>
        Пополнение баланса
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: FormikValues & PaymentFormData) => {
          handleSubmitPayment(values);
        }}
        validationSchema={PaymentFormValidationSchema}
      >
        {({
          errors,
          touched,
          setFieldValue,
        }: FormikState<FormikValues> & FormikHelpers<FormikValues>) => (
          <Form>
            <Field
              name="sum"
              render={({ value }: { value: string }) => (
                <TextField
                  className={s.textField}
                  name="sum"
                  label="Сумма платежа"
                  placeholder="100 руб."
                  helperText={
                    errors && errors.sum && touched.sum
                      ? errors.sum
                      : 'Сумма от 100 до 1000 руб.'
                  }
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: NumberFormat as any, // TODO: typing
                    inputProps: {
                      suffix: ' ₽',
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('sum', parseInt(event.currentTarget.value));
                      },
                    },
                  }}
                  error={!!(errors && errors.sum && touched.sum)}
                  value={value}
                />
              )}
            />
            <Typography variant="h6" component="h6" gutterBottom>
              Реквизиты карты
            </Typography>
            <Field
              name="cardNo"
              render={({ value }: { value: string }) => (
                <TextField
                  name="cardNo"
                  label="Номер карты"
                  placeholder="0000 0000 0000 0000"
                  helperText={errors && errors.cardNo && touched.cardNo && errors.cardNo}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: NumberFormat as any, // todo: typing
                    inputProps: {
                      format: '#### #### #### ####',
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(
                          'cardNo',
                          event.currentTarget.value.replace(/ /g, ''),
                        );
                      },
                    },
                  }}
                  error={!!(errors && errors.cardNo && touched.cardNo)}
                  value={value}
                />
              )}
            />

            <Field
              name="cardExpire"
              render={({ value }: { value: string }) => (
                <TextField
                  name="cardExpire"
                  label="Срок действия"
                  placeholder="MM / ГГ"
                  helperText={errors && errors.cardNo && touched.cardNo && errors.cardNo}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: NumberFormat as any, // todo: typing
                    inputProps: {
                      format: '## / ##',
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(
                          'cardExpire',
                          event.currentTarget.value.replace(/ /g, ''),
                        );
                      },
                    },
                  }}
                  error={!!(errors && errors.cardNo && touched.cardNo)}
                  value={value}
                />
              )}
            />
            <Field
              name="cardCvv"
              render={({ value }: { value: string }) => (
                <TextField
                  name="cardCvv"
                  label="Код CVC / CVV"
                  placeholder="***"
                  helperText={errors && errors.cardNo && touched.cardNo && errors.cardNo}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: NumberFormat as any, // todo: typing
                    inputProps: {
                      format: '###',
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(
                          'cardCvv',
                          event.currentTarget.value.replace(/ /g, ''),
                        );
                      },
                    },
                  }}
                  error={!!(errors && errors.cardNo && touched.cardNo)}
                  value={value}
                />
              )}
            />
            <Field
              name="cardHolder"
              render={({ value }: { value: string }) => (
                <TextField
                  name="cardHolder"
                  label="Владелец карты"
                  placeholder="IVAN IVANOV"
                  helperText={errors && errors.cardNo && touched.cardNo && errors.cardNo}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: NumberFormat as any, // todo: typing
                    inputProps: {
                      format: '#### #### #### ####',
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(
                          'cardNo',
                          event.currentTarget.value.replace(/ /g, ''),
                        );
                      },
                    },
                  }}
                  error={!!(errors && errors.cardNo && touched.cardNo)}
                  value={value}
                />
              )}
            />

            <Field
              name="isConnectAutopay"
              render={({ value }: { value: string }) => (
                <FormGroup>
                  <FormControlLabel
                    className={s.test}
                    control={
                      <Checkbox
                        // checked={true}
                        // onChange={() => {}}
                        name="checkedB"
                        color="primary"
                        classes={{
                          checked: s.checkBox,
                        }}
                      />
                    }
                    label="Подключить автоплатеж"
                  />
                </FormGroup>
              )}
            />

            <Button variant="contained" color="primary" type="submit">
              Оплатить картой
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PaymentForm;
