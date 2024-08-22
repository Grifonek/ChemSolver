"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function addBookMark(id, values) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data: existingData, error: existingError } = await supabase
    .from("favourite")
    .select("name")
    .eq("name", id)
    .eq("userId", session.user.guestId)
    .single();

  // if (existingError) {
  //   console.error(existingError);
  //   throw new Error("Error checking existing bookmark");
  // }

  if (existingData) {
    alert("Bookmark already exist");
    return;
  }

  const { data, error } = await supabase
    .from("favourite")
    .insert([{ name: id, values, userId: session.user.guestId }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Bookmark could not be added");
  }

  return data;
}

export async function deleteBookMark(id) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase
    .from("favourite")
    .delete()
    .eq("name", id)
    .eq("userId", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Bookmark could not be deleted");
  }
}

export async function isBookMarked(id) {
  const session = await auth();
  if (!session) return;

  // throw new Error("You must be logged in");

  const { data, error } = await supabase
    .from("favourite")
    .select("isBookmarked")
    .eq("name", id)
    .eq("userId", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Bookmarks status could not be loaded");
  }

  return data;
}

export async function getBookMarked() {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data, error } = await supabase
    .from("favourite")
    .select("*")
    .eq("userId", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Bookmarks could not be loaded");
  }

  return data;
}

export async function addToHistory(id, values, inputValues, result) {
  const session = await auth();
  if (!session) return;
  // if (!session) throw new Error("You must be logged in");

  const { data, error } = await supabase
    .from("history")
    .insert([
      {
        name: id,
        values: values,
        inputValues: inputValues,
        result: result,
        userId: session.user.guestId,
      },
    ])
    .eq("userId", session.user.guestId)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Could not be added to history");
  }

  return data;
}

export async function getHistory() {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data, error } = await supabase
    .from("history")
    .select("*")
    .eq("userId", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Could not get history");
  }

  return data;
}

// export async function deleteHistory(inputValues, result) {
//   const session = await auth();
//   if (!session) throw new Error("You must be logged in");

//   console.log(inputValues, result);

//   const { error } = await supabase
//     .from("history")
//     .delete()
//     .eq("inputValues", inputValues)
//     .eq("result", result)
//     .eq("userId", session.user.guestId);

//   if (error) {
//     console.error(error);
//     throw new Error("Could not delete from history");
//   }
// }

export async function deleteHistory(inputValues, result) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  let formattedInputValues;
  try {
    formattedInputValues = JSON.stringify(inputValues);
  } catch (error) {
    console.error(error);
    throw new Error("Invalid input values format");
  }

  const { error } = await supabase
    .from("history")
    .delete()
    .eq("inputValues", formattedInputValues)
    .eq("result", result)
    .eq("userId", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Could not delete from history");
  }
}

export async function deleteAllHistory() {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase
    .from("history")
    .delete()
    .eq("userId", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Could not delete from history");
  }

  revalidatePath("/account/history");
}

export async function deleteOldHistory() {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase
    .from("history")
    .delete()
    .eq("created_at", "someValue");

  if (error) {
    console.error(error);
    throw new Error("Could not delete all history");
  }
}

// get all messages

export async function getMessages() {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // const { name, email, image } = session.user;

  const { data, error } = await supabase.from("messages").select("*");

  if (error) {
    console.error(error);
    throw new Error("Could not get all messages");
  }

  return data;
}

// create message

export async function createMessage(heading, text) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        heading: heading,
        text: text,
        userId: session.user.guestId,
        userName: session.user.name,
        userEmail: session.user.email,
        userImg: session.user.image,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Could not create new message");
  }

  revalidatePath("/account/discussion");

  return data;
}

// edit message
export async function updateMessage(heading, text, messageId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data, error } = await supabase
    .from("messages")
    .update({ heading: heading, text: text })
    .eq("userId", session.user.guestId)
    .eq("id", messageId)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Could not update message");
  }

  revalidatePath("/account/discussion");

  return data;
}

// delete message
export async function deleteMessage(messageId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error: likesError } = await supabase
    .from("messageLikes")
    .delete()
    .eq("messageId", messageId);

  const { error: replyError } = await supabase
    .from("replies")
    .delete()
    .eq("messageId", messageId);

  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", messageId)
    .eq("userId", session.user.guestId);

  if (error || replyError) {
    console.error(error);
    throw new Error("Could not delete message");
  }

  revalidatePath("/account/discussion");
}

// create reply message
export async function createReply(idOfMessage, text) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data, error } = await supabase
    .from("replies")
    .insert([
      {
        text: text,
        messageId: idOfMessage,
        userId: session.user.guestId,
        userName: session.user.name,
        userEmail: session.user.email,
        userImg: session.user.image,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Could not reply to message");
  }

  // revalidatePath("/account/discussion");

  return data;
}

// get replies

export async function getReplies() {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data, error } = await supabase.from("replies").select("*");

  if (error) {
    console.error(error);
    throw new Error("Could not get all replies");
  }

  return data;
}

// give like

export async function addLike(messageId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const userId = session.user.guestId;

  const { data: existingLike, error: likeCheckError } = await supabase
    .from("messageLikes")
    .select("*")
    .eq("userId", userId)
    .eq("messageId", messageId)
    .single();

  if (existingLike) {
    throw new Error("You have already liked this message");
  }

  const { data: message, error: fetchError } = await supabase
    .from("messages")
    .select("likes")
    .eq("id", messageId)
    .single();

  if (fetchError) {
    throw new Error("Could not fetch message");
  }

  const updatedLikes = message.likes + 1;

  const { data: updatedMessage, error: updateError } = await supabase
    .from("messages")
    .update({ likes: updatedLikes }) // increment likes
    .eq("id", messageId)
    .select();

  if (updateError) {
    console.error(updateError);
    throw new Error("Could not add like to message");
  }

  const { data: likeData, error: likeInsertError } = await supabase
    .from("messageLikes")
    .insert([{ userId: userId, messageId: messageId }]);

  if (likeInsertError) {
    console.error(likeInsertError);
    throw new Error("Could not record the like");
  }

  console.log("database passed");

  return updatedMessage;
}

// edit reply
export async function updateReply(text, replyId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data, error } = await supabase
    .from("replies")
    .update({ text: text })
    .eq("userId", session.user.guestId)
    .eq("id", replyId)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Could not update reply message");
  }

  revalidatePath("/account/discussion");

  return data;
}

// delete reply
export async function deleteReply(replyId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase
    .from("replies")
    .delete()
    .eq("id", replyId)
    .eq("userId", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Could not delete reply");
  }

  revalidatePath("/account/discussion");
}
