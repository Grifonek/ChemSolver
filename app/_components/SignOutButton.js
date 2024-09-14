"use client";

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { signOutAction } from "../_lib/actions";
import ModalConfirm from "./ModalConfirm";

function SignOutButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSignOut(e) {
    e.preventDefault();
    setIsModalOpen(true);
  }

  function handleConfirm() {
    setIsModalOpen(false);
    signOutAction();
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

  return (
    <>
      <form onSubmit={handleSignOut}>
        <button
          type="submit"
          className="flex items-center gap-4 py-6 px-5 h-full w-full"
        >
          <ArrowLeftStartOnRectangleIcon className="size-6" />
          Sign out
        </button>
      </form>
      {isModalOpen && (
        <ModalConfirm
          message="Are you sure you want to sign out?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          buttonText="Yes"
        />
      )}
    </>
  );
}

export default SignOutButton;
