import MessagesWrapper from "@/app/_components/MessagesWrapper";
import Spinner from "@/app/_components/Spinner";
import { getMessages, getReplies } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: "Discussion",
  description:
    "Discussion is here for you to let us know about problems, ideas to add in ChemSolver or just to chat with us and all ChemSolver users.",
};

export default async function Page() {
  const session = await auth();
  const currentUserId = session?.user?.guestId || null;

  const fetchedMessages = await getMessages();
  const fetchedReplies = await getReplies();

  if (!fetchedMessages || !fetchedReplies) {
    return <Spinner />;
  }

  return (
    <MessagesWrapper
      messages={fetchedMessages}
      replies={fetchedReplies}
      currentUserId={currentUserId}
    />
  );
}
