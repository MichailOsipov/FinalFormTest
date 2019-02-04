import * as React from 'react';
import {FinalForm} from 'components/final-form';
import {ReactFinalForm} from 'components/react-final-form';

export const MainPage = () => (
    <div>
        <div>
            <h1>Final Form:</h1>
            <FinalForm />
        </div>
        <div>
            <h1>React Final Form</h1>
            <ReactFinalForm />
        </div>
    </div>
);
