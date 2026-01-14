import { AuthUser } from '../../types/auth.type'
import { UserCreateProps } from './user.model'
import { UserService } from './user.service'

export class UserController {
  static async addUserController(
    payload: UserCreateProps,
    userWhoCreated: AuthUser
  ) {
    await UserService.verifyUsernameIsExisting(payload.username)

    const roleId = await UserService.getRoleId(payload.userRole)
    const user = await UserService.addUser(
      payload,
      roleId,
      userWhoCreated.user_id
    )

    return {
      status: 'success',
      data: user,
    }
  }

  static async getAllUserController() {
    const { rows } = await UserService.getUsers()
    return {
      status: 'success',
      data: rows,
    }
  }

  static async deleteUserController(userId: string) {
    await UserService.getUserById(userId)
    const id = await UserService.deleteUserById(userId)
    return {
      status: 'success',
      message: 'User deleted successfully',
      data: id,
    }
  }
}
