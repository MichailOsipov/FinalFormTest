import * as React from 'react';
import {Form, Field} from 'react-final-form';

const onSubmit = values => new Promise((resolve) => {
    setTimeout(() => {
        console.log('async submit', values);
        resolve();
    }, 3000);
});

const verifyAsyncFirstName = values => new Promise((resolve) => {
    setTimeout(() => {
        if (values.firstName && values.firstName.length < 6) {
            resolve({firstName: 'Still not enough'});
        }
        resolve({});
    }, 3000);
});

export const ReactFinalForm = () => (
    <Form
        onSubmit={onSubmit}
        initialValues={{}}
        validate={(values) => {
            const errors = {};
            if (!values.firstName) {
                errors.firstName = 'Required';
            }
            if (values.firstName && values.firstName.length < 3) {
                errors.firstName = 'Too short First Name';
            }

            if (!values.lastName) {
                errors.lastName = 'Required';
            }
            return Object.keys(errors).length ? errors : verifyAsyncFirstName(values);
        }}
        render={({handleSubmit, form, submitting, pristine, values, validating}) => (
            <form onSubmit={handleSubmit}>
                {validating ? 'validating' : 'not-validating'}
                <div>
                    <Field
                        name="firstName"
                        format={value => value && value.toUpperCase()}
                        parse={value => value && value.toLowerCase()}
                    >
                        {({input, meta}) => (
                            <div>
                                <label>First Name</label>
                                <input
                                    {...input}
                                    type="text"
                                    placeholder="First Name"
                                />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                </div>
                <div>
                    <Field
                        name="lastName"
                        validate={value => (value ? undefined : 'Required 123')}
                    >
                        {({input, meta}) => (
                            <div>
                                <label>Last Name</label>
                                <input
                                    {...input}
                                    type="text"
                                    placeholder="Last Name"
                                />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                </div>
                <div>
                    <button type="submit" disabled={submitting || pristine}>
                        Submit
                    </button>
                    <button type="button" onClick={form.reset} disabled={submitting || pristine}>
                        Reset
                    </button>
                </div>
                <pre>
                    {JSON.stringify(values, 0, 2)}
                </pre>
            </form>
        )}
    />
);
