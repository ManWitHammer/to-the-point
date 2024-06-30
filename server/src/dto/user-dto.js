export class UserDto {
	constructor(model) {
		this.surname = model.surname
		this.name = model.name
		this.avatarColor = model.avatarColor
		this.email = model.email
		this.id = model._id
		this.isActivated = model.isActivated
	}
}
