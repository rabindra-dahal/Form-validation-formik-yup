import { Formik, useField } from 'formik';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';

// Custom reusable TextInput component integrated with Formik's useField hook
const MyTextInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={helpers.setValue}
        onBlur={helpers.setTouched}
        value={field.value}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Text style={styles.errorText}>{meta.error}</Text>
      ) : null}
    </View>
  );
};

const Index = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log('Form Submitted:', values);
          // Simulate API call
          setTimeout(() => {
            setSubmitting(false);
            resetForm(); // Reset form after successful submission
            alert('Form submitted successfully!');
          }, 1000);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <View>
            <MyTextInput
              label="Username"
              name="username"
              placeholder="Enter your username"
            />
            <MyTextInput
              label="Email"
              name="email"
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            <MyTextInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              secureTextEntry
            />
            <MyTextInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm your password"
              secureTextEntry
            />
            <Button
              onPress={handleSubmit}
              title={isSubmitting ? 'Submitting...' : 'Submit'}
              disabled={isSubmitting}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Index;

// standard password validation widely used
// password: Yup.string()
//     .min(8, 'Password must be at least 8 characters')
//     .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
//     .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
//     .matches(/\d/, 'Password must contain at least one number')
//     .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
//     .required('Password is required'),

// address: Yup.object({
//     street: Yup.string().required('Street is required'),
//     city: Yup.string().required('City is required'),
//     zip: Yup.string().matches(/^[0-9]{5}$/, 'ZIP code must be exactly 5 digits'),
//   }),

// https://medium.com/@ignatovich.dm/implementing-advanced-form-validation-with-formik-and-yup-898d34e17ad0