import { Link } from "react-router";

export default function Login() {
    return (
        <div className='my-wrapper'>

            <div class="login-container">
                <form class="login-form">
                    <h2>Login</h2>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required />

                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required />

                    <button type="submit">Login</button>
                </form>
                <p>Not registered? Click <Link href="/auth/register">here</Link></p>
            </div>
        </div>


    )
}