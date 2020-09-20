import React, { ReactElement } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Form, Formik, FormikProps, Field, FormikHelpers, FormikState, FormikValues } from 'formik';
import * as Yup from 'yup';
import NumberFormat from 'react-number-format';

// import { playerAtom } from '../../store/player/atoms';

// TODO: улучшить типизацию

interface PaymentFormValues {
  sum: string;
  // cardNumber: string;
  // cardExpireDate: string;
  // cardCvv: number;
}

const PaymentFormValidationSchema = Yup.object().shape({
  sum: Yup.number()
    .required('Поле обязательно для заполнения')
    .positive('Сумма должна быть больше 0')
    .integer('Введите целочисленное значение')
    .min(100, 'Сумма должна быть > 100')
    .max(1000, 'Сумма должна быть < 1000')
    .typeError('Введите целочисленное значение'),
});

const PaymentForm: React.FC = () => {
  // const store = React.useMemo(() => createStore(combine([playerAtom])), []);
  // React.useEffect(() => connectReduxDevtools(store), []);

  const initialValues: PaymentFormValues = {
    sum: '',
    // cardNumber: '',
    // cardExpireDate: '',
    // cardCvv: 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
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
                  inputComponent: NumberFormat as any, // todo: typing
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
          <Button variant="contained" color="primary" type="submit">
            Оплатить картой
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentForm;
