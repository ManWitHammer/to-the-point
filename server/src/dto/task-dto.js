export class TaskDto {
	constructor(model) {
		this.title = model.title
		this.description = model.description
		this.time = model.time
		this.id = model._id
	}
}
