import { Formik } from 'formik';
import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SimpleFormValidationFormikYup = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        // Handle login submission here
        console.log('Login values:', values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <TextInput
            style={{ 
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              marginBottom: 10,
              borderRadius: 5,
              
            }}
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

          <TextInput
            style={{ 
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              marginBottom: 10,
              borderRadius: 5,
              
            }}
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
          />
          {errors.password && touched.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

          <Button onPress={handleSubmit} title="Login" />
        </View>
      )}
    </Formik>
  );
};

export default SimpleFormValidationFormikYup;