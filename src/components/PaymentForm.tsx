import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Form, Formik, FormikProps, Field } from 'formik';
import * as Yup from 'yup';

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
    .max(1000, 'Сумма должна быть < 1000'),
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

  // const [field, meta, helpers] = useField(props);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={PaymentFormValidationSchema}
    >
      {({ errors, touched, setFieldValue }: { errors: any; touched: any; setFieldValue: any }) => {
        console.log(errors, touched);
        return (
          <Form>
            <Field
              name="sum"
              render={(
                {
                  /* { name, value, onChange, onBlur } */
                },
              ) => (
                <TextField
                  name="sum"
                  // id="standard-full-width"
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
                  error={!!(errors && errors.sum && touched.sum)}
                  onChange={(event: any) => setFieldValue('sum', parseInt(event.target.value))}
                />
              )}
            />
            <Button variant="contained" color="primary" type="submit">
              Оплатить картой
            </Button>
          </Form>
        );
      }}
    </Formik>
    // <div>
    //   <TextField
    //     id="standard-full-width"
    //     label="Label"
    //     style={{ margin: 8 }}
    //     placeholder="Placeholder"
    //     fullWidth
    //     margin="normal"
    //     InputLabelProps={{
    //       shrink: true,
    //     }}
    //   />
    //   <TextField
    //     id="standard-full-width"
    //     label="Label"
    //     style={{ margin: 8 }}
    //     placeholder="Placeholder"
    //     fullWidth
    //     margin="normal"
    //     InputLabelProps={{
    //       shrink: true,
    //     }}
    //   />
    //   <Button variant="contained" color="primary">
    //     Primary
    //   </Button>
    // </div>
  );
};

export default PaymentForm;
