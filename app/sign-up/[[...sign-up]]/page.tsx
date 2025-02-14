import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
    return (
        <div>
            <h1>S'inscrire</h1>
            <SignUp path="/sign-up" />
        </div>
    );
};

export default SignUpPage;