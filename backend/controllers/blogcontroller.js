const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const config = require('../utils/config');
const Blog = require('../models/blog');


exports.getAllBlogs=catchAsync(async (req,res,next) => {
    let blogs = await Blog.find();

    if(!blogs.length) {
        return next(new appError('Blogs don\'t exists', 404));
    }

    res.status(200).json(blogs);
});


exports.newBlog=catchAsync(async (req,res,next) => {
    let newBlog = new Blog({
        ...req.body
    });
    
    await newBlog.save();

    res.status(200).send('blog created successfully!!!');
});


exports.getBlog=catchAsync(async (req,res,next) => {
    let blog = await Blog.findById(req.params.blogId);

    if(!blog) {
        return next(new appError(`Blogs with id ${req.params.blogId} doesn't exists`, 404));
    }

    res.status(200).json(blog);
});


exports.modifyBlog=catchAsync(async (req,res,next) => {
    await Blog.findByIdAndUpdate(req.params.blogId, {
        $set:
            req.body
        },
        {runValidators: true}
    );

    let modified = await  Blog.findById(req.params.blogId);

    res.status(200).json(modified);
});


exports.deleteBlog=catchAsync(async (req,res,next) => {
    await Blog.findByIdAndRemove(req.params.blogId);
    res.status(200).send(`Blog with id ${req.params.blogId} is deleted successfully!!!`);
});