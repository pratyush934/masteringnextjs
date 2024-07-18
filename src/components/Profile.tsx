import React from "react";
import PromptCard from "./PromptCard";

const ProfileComponent = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: {
  name: string | null;
  desc: string;
  data: any;
  handleEdit: any | null;
  handleDelete: any | null;
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span>{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-16 prompt_layout">
        {data.map((post: any) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={() => {}}
            handleDelete={() => handleDelete && handleDelete(post)}
            handleEdit={() => handleEdit && handleEdit(post)}
          />
        ))}
      </div>
      
    </section>
  );
};

export default ProfileComponent;
