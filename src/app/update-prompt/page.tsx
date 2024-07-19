"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface Post {
  prompt: string;
  tag: string;
}

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  console.log(promptId);

  const UpdatePrompt = async (e: any) => {
    //todo
    e.preventDefault();
    setSubmitting(true);

    // console.log("--------> ", post.prompt);
    if (!promptId) alert("Nahi mila nahi mila");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
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

  useEffect(() => {
    const getPromptDetailFunction = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      //   console.log("000000--->", response);
      const data = await response.json();
      console.log(data);
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetailFunction();
  }, [promptId]);

  return (
    <div>
      <Form
        type="Update"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={UpdatePrompt}
      />
    </div>
  );
};

const Page = () => {
    return (
        <Suspense>
            <UpdatePrompt />
        </Suspense>
    )
}

export default Page;
