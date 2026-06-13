import { blogModel } from '../models/blog.model.js';

const getBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find();
        res.status(200).json({ data: blogs, message: 'Blogs fetched successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addBlogController = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            throw new Error('Title and content are required');
        }
        const blog = await blogModel.create({ title, content });
        res.status(201).json({ data: blog, message: 'Blog added successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// app.post("/EditBlog", (req, res) => {
//     console.log("Edit Inside");
//     console.log(req.query.id);
//     BlogCollection.updateOne({ _id: req.query.id }, { Title: req.query.BlogTitle, Content: req.query.BlogContent }).then((response) => {
//         console.log(response);
//         BlogCollection.find().then((response) => {
//             console.log(response);
//             res.json(response);
//         }).catch((err) => {
//             console.log(err);
//         })
//     }).catch((err) => {
//         console.log(err);
//     })
// })

const updateBlogController = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params;

        if (!id) {
            throw new Error('Blog ID is required');
        }

        const blog = await blogModel.findByIdAndUpdate(id, { title, content }, { new: true });

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json({ data: blog, message: 'Blog updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error('Blog ID is required');
        }
        
        const blog = await blogModel.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json({ data: blog, message: 'Blog deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { getBlogsController, addBlogController, updateBlogController, deleteBlogController };