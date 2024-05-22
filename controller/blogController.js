import Blog from "../models/blogSchema.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find().select("headline title banner content");
    blogs = blogs.map((blog) => {
      const content = blog.content.find((item) => item.type === "paragraph");
      return {
        ...blog._doc,
        content: content ? [content] : [],
      };
    });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createBlog = async (req, res) => {
  const { headline, title, banner, content } = req.body;
  const slug = title.toLowerCase().replace(/ /g, "-");
  try {
    const newBlog = new Blog({ headline, title, slug, banner, content });
    if (headline.length > 30) {
      return res.status(400).json({
        success: false,
        message: "Headline should not exceed 30 characters",
      });
    }
    await newBlog.save();
    res.status(201).json({
      success: true,
      message: "Blog Added Successfully",
      blog: newBlog,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { headline, title, banner, content } = req.body;
  const slug = title.toLowerCase().replace(/ /g, "-");
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { headline, title, slug, banner, content },
      { new: true, runValidators: true }
    );
    if (!updatedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({
      success: true,
      message: "Blog Updated Successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Blog Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};