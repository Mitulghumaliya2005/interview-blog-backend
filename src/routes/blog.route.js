import Router from 'express';
import { getBlogsController, addBlogController, updateBlogController, deleteBlogController } from '../controllers/blog.controller.js';

const router = Router();

router.get('/getBlogs', getBlogsController);
router.post('/addBlog', addBlogController);
router.put('/updateBlog', updateBlogController);
router.delete('/deleteBlog/:id', deleteBlogController);

export default router;