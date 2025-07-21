import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setPost(data);
      }
    };

    fetchPost();
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white py-20 px-4">
      {post && (
        <motion.div
          className="max-w-3xl mx-auto bg-[#1c1f26] p-8 rounded-3xl shadow-lg border border-[#2c2f36] text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-sm text-gray-400 mb-6">
            {new Date(post.created_at).toLocaleDateString()}
          </p>

          {post.featured_image && (
            <img
              src={post.featured_image}
              alt="Featured"
              className="w-full h-64 object-cover rounded-xl mb-6 border border-[#1c1f26]"
            />
          )}

          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </motion.div>
      )}
    </div>
  );
}
