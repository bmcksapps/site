// src/pages/Blog.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      console.log("📬 POSTS FROM SUPABASE:", data);

      if (error) console.error("Error fetching posts:", error);
      else setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-[#0d1117] text-white py-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-blue-400">
          🧠 BMCKSAPPS Blog
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-400">No posts yet...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                className="bg-[#1c1f26] p-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer"
                onClick={() => navigate(`/blog/${post.slug}`)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-400 text-sm mb-4">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
                <p className="text-gray-300 line-clamp-3">
                  {post.content.slice(0, 180)}...
                </p>
                <p className="text-blue-400 font-semibold mt-3">Read More →</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

