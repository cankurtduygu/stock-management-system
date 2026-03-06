import SignInForm from '../components/SignInForm';

const SignIn = () => {
  return (
    <div
      className="bg-background/70 dark:bg-background/10 flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
      style={{
        backgroundImage: "url('/auth-bg.png')",
      }}
    >
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
