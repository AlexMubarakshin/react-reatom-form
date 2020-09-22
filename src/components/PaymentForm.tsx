import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Formik, Field, FormikHelpers, FormikState, FormikValues } from 'formik';
import { Button, TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { useAction, useAtom } from '@reatom/react';
import { executePayment } from 'store/payment-form/actions';
import { paymentStatusAtom } from 'store/payment-form/atoms';

// TODO: улучшить типизацию

interface PaymentFormValues {
  sum: string;
  cardNo: string;
}

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

const PaymentForm: React.FC = () => {
  const executePaymentAction = useAction(executePayment);
  const handleSubmitPayment = React.useCallback((paymentData: any) => {
    // TODO: type for payment data
    executePaymentAction();
  }, []);
  const paymentStatus = useAtom(paymentStatusAtom);

  useEffect(() => {
    console.log(paymentStatus);
    if (paymentStatus === 'success') {
      alert(`Payment status: ${paymentStatus}`);
    }
  }, [paymentStatus]);

  const initialValues: PaymentFormValues = {
    sum: '',
    cardNo: '',
    // cardExpireDate: '',
    // cardCvv: 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: FormikValues) => {
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
                name="sum"
                label="Сумма"
                style={{ margin: 8 }}
                placeholder="100 руб."
                helperText={
                  errors && errors.sum && touched.sum ? errors.sum : 'Сумма от 100 до 1000 руб.'
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
          <Field
            name="cardNo"
            render={({ value }: { value: string }) => (
              <TextField
                name="cardNo"
                label="Номер карты"
                style={{ margin: 8 }}
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
                      setFieldValue('cardNo', event.currentTarget.value.replace(/ /g, ''));
                    },
                  },
                }}
                error={!!(errors && errors.cardNo && touched.cardNo)}
                value={value}
              />
            )}
          />
          <Button variant="contained" color="primary" type="submit">
            Оплатить картой
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentForm;
