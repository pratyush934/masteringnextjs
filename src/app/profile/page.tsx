"use client";
import ProfileComponent from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [myPosts, setMyPost] = useState<{ _id: string }[]>([]);

  const handleEdit = (post: any) => {
    router.push(`/update-prompt?id=${post?._id}`);
  };

  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm(`Are You sure buddy`);

    if (hasConfirmed) {
      try {
          
          await fetch(`/api/prompt/${post?._id.toString()}`, {
              method: "DELETE",
            });
            
        const filter = myPosts.filter((item) => {
            const filter = myPosts.filter((item) => item?._id !== post?._id);
        });
        console.log(myPosts);

        setMyPost(filter);
      } catch (error) {
        console.log(`Error exist in delete`);
      }
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user?.id}/posts`);
        // console.log(response);
        const data = await response.json();
        setMyPost(data);
      } catch (error) {}
      console.log(`Error in  profile -> page.tsx fetchPost`);
    };
    if (session?.user?.id) fetchPost();
  }, [session?.user?.id]);

  return (
    <ProfileComponent
      name="My"
      desc="Welcome Back"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Profile;
