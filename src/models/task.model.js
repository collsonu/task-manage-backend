import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
    },
    assignedTo: {
        type: String,
    },
    tags: {
        type: String,
        enum: ['work', 'personal', 'others'],
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    lastDate: {
        type: Date,
        default: Date.now
    },
    completionDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'progress', 'completed'],
        default: 'pending',
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema)