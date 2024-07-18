import { Schema, model } from 'mongoose'

const TasksSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    tasks: [{ 
        title: { type: String, require: true },
        description: { type: String, require: true },
        time: { type: Date, require: true },
        taskId: { type: Schema.Types.ObjectId, ref: 'Task', require: true },
    }]
})

export const TasksModel = model('Task', TasksSchema)
