import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useForm from "../../../hooks/UseForm";

export default function Register() {
    const { registerHandler } = useAuth()
    const { values, onChange, onSubmit } = useForm(registerHandler, {
        email: '',
        password: '',
        rePass: '',
    });

    return (
        <div className='my-wrapper'>

            <div class="login-container">
                <form class="login-form" onSubmit={onSubmit}>
                    <h2>Register</h2>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" value={values.email} onChange={onChange} required />

                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" value={values.password} onChange={onChange} required />

                    <label for="rePass">Confirm password:</label>
                    <input type="password" id="rePass" name="rePass" value={values.rePass} onChange={onChange} required />

                    <button type="submit">Login</button>
                </form>
                <p>Already registered? Click <Link to="/auth/login">here</Link></p>
            </div>
        </div>

    )
}