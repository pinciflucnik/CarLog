import { Link } from "react-router";

export default function Register() {
    return (
        <div className='my-wrapper'>

            <div class="login-container">
                <form class="login-form">
                    <h2>Register</h2>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required />

                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required />

                    <label for="rePass">Confirm password:</label>
                    <input type="password" id="rePass" name="rePass" required />

                    <button type="submit">Login</button>
                </form>
                <p>Already registered? Click <Link to="/auth/login">here</Link></p>
            </div>
        </div>

    )
}