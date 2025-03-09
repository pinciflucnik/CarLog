import { useState } from "react"

export default function useForm(submitHandler, initialValues) {
    const [values, setValues] = useState(initialValues);
    const [file, setFile] = useState({});

    const onChange = (e) => {
        // if(e.target.type === 'file'){
        //     console.log(e.target.files[0]);
            
        //     setValues(state => ({
        //         ...state,
        //         [e.target.name]: e.target.files[0]
        //     }))

        // }
        
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
        
    };

    const onSubmit = (e) => {
        e.preventDefault();

        submitHandler(values);
    };

    const onFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        
        setFile(selectedFile);
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    return {
        values,
        file,
        onFileSelect,
        onChange,
        onSubmit,
    }
}