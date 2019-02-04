import * as React from 'react';
import {createForm} from 'final-form';

const onSubmit = values => new Promise((resolve) => {
    setTimeout(() => {
        console.log('async submit', values);
        resolve();
    }, 3000);
});

export class FinalForm extends React.Component {
    constructor() {
        super();
        const initialState = {};
        let inConstructor = true;
        this.form = createForm({onSubmit});

        this.unsubscribe = this.form.subscribe((formState) => {
            if (inConstructor) {
                initialState.formState = formState;
            } else {
                this.setState({formState});
            }
        },
        {
            active: true,
            pristine: true,
            submitting: true,
            values: true
        });

        this.unsubscribeFields = ['firstName', 'lastName'].map(fieldName =>
            this.form.registerField(fieldName, (fieldState) => {
                if (inConstructor) {
                    initialState[fieldName] = fieldState;
                } else {
                    this.setState({[fieldName]: fieldState});
                }
            },
            {
                value: true
            })
        );

        this.state = initialState;
        inConstructor = false;
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.unsubscribeFields.forEach(unsubscribe => unsubscribe());
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.form.submit();
    }

    render() {
        const {formState, firstName, lastName} = this.state;
        console.log(formState);
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>First Name</label>
                        <input
                            name="firstName"
                            onBlur={firstName.blur}
                            onChange={event => firstName.change(event.target.value || undefined)}
                            onFocus={firstName.focus}
                            value={firstName.value || ''}
                            placeholder="First Name"
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            name="lastName"
                            onBlur={lastName.blur}
                            onChange={event => lastName.change(event.target.value || undefined)}
                            onFocus={lastName.focus}
                            value={lastName.value || ''}
                            placeholder="Last Name"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={formState.submitting || formState.pristine}
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={this.form.reset}
                            disabled={formState.submitting || formState.pristine}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
