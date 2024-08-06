import { supabase } from "./supabase";

// export async function addBookMark(id, values) {
//   const { data: existingData, error: existingError } = await supabase
//     .from("favourite")
//     .select("name")
//     .eq("name", id)
//     .single();

//   // if (existingError) {
//   //   console.error(existingError);
//   //   throw new Error("Error checking existing bookmark");
//   // }

//   if (existingData) {
//     alert("Bookmark already exist");
//     return;
//   }

//   const { data, error } = await supabase
//     .from("favourite")
//     .insert([{ name: id, values }])
//     .select();

//   if (error) {
//     console.error(error);
//     throw new Error("Bookmark could not be added");
//   }

//   return data;
// }

// export async function deleteBookMark(id) {
//   const { error } = await supabase.from("favourite").delete().eq("name", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Bookmark could not be deleted");
//   }
// }

// export async function getBookMarked() {
//   const { data, error } = await supabase.from("favourite").select("*");

//   if (error) {
//     console.error(error);
//     throw new Error("Bookmarks could not be loaded");
//   }

//   return data;
// }

// export async function isBookMarked(id) {
//   const { data, error } = await supabase
//     .from("favourite")
//     .select("isBookmarked")
//     .eq("name", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Bookmarks status could not be loaded");
//   }

//   return data;
// }

// export async function addToHistory(id, values, inputValues, result) {
//   const { data, error } = await supabase
//     .from("history")
//     .insert([
//       { name: id, values: values, inputValues: inputValues, result: result },
//     ])
//     .select();

//   if (error) {
//     console.error(error);
//     throw new Error("Could not be added to history");
//   }

//   return data;
// }

// export async function getHistory() {
//   const { data, error } = await supabase.from("history").select("*");

//   if (error) {
//     console.error(error);
//     throw new Error("Could not get history");
//   }

//   return data;
// }

export async function getUser(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function createUser(newUser) {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select();

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  return data;
}
