"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";

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

  const router = useRouter();
  const { data: session } = useSession();
  const CreatePrompt = async (e: any) => {
    //todo
    e.preventDefault();
    setSubmitting(true);
    /* 
        1. fetch(/api/prompt/new, {
            method: post,
            body: json.stringify({
            data -> prompt, userId, tag
            })
        })
        2. if(responsk.ok) => router -> /
        3. setSubmitting false
    */
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id as string,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(`Error exist in create-prompt, page.tsx`, error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Create"
        post={"post"}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={CreatePrompt}
      />
    </div>
  );
};

export default CreatePrompt;
