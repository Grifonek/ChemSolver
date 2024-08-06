import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="flex items-center gap-4 py-6 px-5 h-full w-full">
        <ArrowLeftStartOnRectangleIcon className="size-6" />
        Sign out
      </button>
    </form>
  );
}

export default SignOutButton;
