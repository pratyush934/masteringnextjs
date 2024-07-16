"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
  prompt: string;
  tag: string;
}

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });

  const CreatePrompt = async (e) => {
    //todo
  }

  return <div>

  <Form
    type="Create"
    post={"post"}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={CreatePrompt}
  />

  </div>;
};

export default CreatePrompt;
