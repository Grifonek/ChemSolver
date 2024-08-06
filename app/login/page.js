import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-10 mt-24">
      <h1 className="text-2xl">Sign in</h1>
      <SignInButton />
    </div>
  );
}
