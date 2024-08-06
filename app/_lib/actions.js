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
  if (!session) throw new Error("You must be logged in");

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
}
