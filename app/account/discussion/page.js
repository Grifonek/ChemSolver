import MessagesWrapper from "@/app/_components/MessagesWrapper"; // Client component
import Spinner from "@/app/_components/Spinner";
import { getMessages, getReplies } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: "Discussion",
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
