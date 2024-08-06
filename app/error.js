"use client";

export default function Error() {
  return (
    <main>
      <h1>Something went wrong!</h1>
      <p>Message</p>

      <button onClick={() => reset()}>Try again</button>
    </main>
  );
}
