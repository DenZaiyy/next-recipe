import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
    return (
        <div className='flex flex-col gap-4 items-center justify-center'>
            <h1 className="text-4xl">Se connecter</h1>
            <SignIn />
        </div>
    );
};

export default SignInPage;