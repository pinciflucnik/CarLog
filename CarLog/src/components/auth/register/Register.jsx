import { Link } from "react-router";
import useAuth from "../../../hooks/UseAuth";
import useForm from "../../../hooks/UseForm";

export default function Register() {
    const { registerHandler } = useAuth();
    const { values, onChange, onSubmit } = useForm(registerHandler, {
        email: '',
        password: '',
        rePass: '',
    });

    return (
        <div className='my-wrapper'>

            <div className="login-container">
                <form className="login-form" onSubmit={onSubmit}>
                    <h2>Register</h2>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" autoComplete="new-email" value={values.email} onChange={onChange} required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" autoComplete="new-password" value={values.password} onChange={onChange} required />

                    <label htmlFor="rePass">Confirm password:</label>
                    <input type="password" id="rePass" name="rePass" autoComplete="repeat-password" value={values.rePass} onChange={onChange} required />

                    <button type="submit">Login</button>
                </form>
                <p>Already registered? Click <Link to="/auth/login">here</Link></p>
            </div>
        </div>

    )
}