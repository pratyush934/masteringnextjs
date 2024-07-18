"use client";

import ProfileComponent from "@/components/Profile";
import PromptCard from "@/components/PromptCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MateProfile = ({ params }: { params: { id: string, name: string } }) => {
  //   console.log(params.id);
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    console.log(name);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      console.log(data);

      setPosts(data);
    };
    if (params.id) fetchPosts();
  }, [params.id]);

  return (
    <div>
      <ProfileComponent
        name={name}
        desc={`Welcome to ${name} personalized profile page`}
        data={posts}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    </div>
  );
};

export default MateProfile;
