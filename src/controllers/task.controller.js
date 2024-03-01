import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/task.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const createTask = asyncHandler(async (req, res) => {
    try {
        const _id = req.body._id;
        const taskData = _id ? await Task.findById(_id) : new Task();

        taskData.title = req.body.title;
        taskData.description = req.body.description;
        taskData.dueDate = req.body.dueDate;
        taskData.priority = req.body.priority;
        taskData.assignedTo = req.body.assignedTo;
        taskData.tags = req.body.tags;
        taskData.createdDate = req.body.createdDate;
        taskData.lastDate = req.body.lastDate;
        taskData.completionDate = req.body.completionDate;
        taskData.status = req.body.status;

        await taskData.save();

        return res.status(201).json(
            new ApiResponse(201, createTask, "Task Created Successfully")
        )
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

})
function clearSearch(obj) {
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "object") {
            clearSearch(value);
        } else {
            if ((typeof value === 'string' && value.length < 1)) {
                delete (obj[key]);
            }
        }
    }
}

const getAllTask = asyncHandler(async (req, res) => {

    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);



        const search = {
            $or: [
                {
                    title: { '$regex': new RegExp(req.query.key || ''), $options: 'i' }
                }

            ],

            status: req.query.status || '',
            tags: req.query.tags || '',
            priority: req.query.priority || '',
            isDeleted: false
        };
        clearSearch(search);

        const items = await Task.find(search)
            .skip(skip)
            .limit(parseInt(limit));

        const totalItems = await Task.countDocuments(search);

        res.json({
            items,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: parseInt(page),
            totalItems
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
})

const deleteTask = asyncHandler(async (req, res) => {
    const _id = req.body._id;
    try {
        const task = await Task.findById(_id);
        task.isDeleted = true
        await task.save();
        return res.status(201).json(
            new ApiResponse(200, task, "Task Deleted Successfully")
        )
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})


export {
    createTask, getAllTask, deleteTask
}