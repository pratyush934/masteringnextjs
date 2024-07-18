"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: any[];
  handleTagClick: any;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleDelete={() => {}}
          handleEdit={() => {}}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  // console.log(posts);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleTag = (id: string) => {
    // setSearchText()
    setSearchText(id)
  }
  useEffect(() => {
    // console.log("Posts:", posts); // Debugging: Check the posts data structure
    // console.log("Search Text:", searchText); // Debugging: Check the current search text

    if (!searchText.trim()) {
      console.log(
        "Setting filtered posts to all posts because searchText is empty"
      );
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.prompt.toLowerCase().includes(searchText.trim().toLowerCase()) ||
          post.tag.toLowerCase().includes(searchText.trim().toLowerCase())
      );
      // console.log("Filtered Posts:", filtered); // Debugging: Check the filtered results
      setFilteredPosts(filtered);
    }
  }, [searchText, posts]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      // console.log(response);
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={searchText ? filteredPosts : posts} handleTagClick={handleTag} />
    </section>
  );
};

export default Feed;
