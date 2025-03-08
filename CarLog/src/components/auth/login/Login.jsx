import { Link } from "react-router";
import useForm from "../../../hooks/UseForm";
import useAuth from "../../../hooks/UseAuth";

export default function Login() {
    const { loginHandler } = useAuth
    const { values, onChange, onSubmit } = useForm(loginHandler, {email:'', password:''})
    return (
        <div className='my-wrapper'>

            <div className="login-container">
                <form className="login-form" onSubmit={onSubmit}>
                    <h2>Login</h2>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" autoComplete="email" value={values.email} onChange={onChange} required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" autoComplete="password" value={values.password} onChange={onChange} required />

                    <button type="submit">Login</button>
                </form>
                <p>Not registered? Click <Link href="/auth/register">here</Link></p>
            </div>
        </div>


    )
}