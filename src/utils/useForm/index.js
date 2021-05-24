import { useState } from "react";

export const useForm = (initialValue) => {
    const [values, setValue] = useState(initialValue);
    return [values, (formType, formValue) => {
        setValue({...values, [formType]: formValue});
    }]
}