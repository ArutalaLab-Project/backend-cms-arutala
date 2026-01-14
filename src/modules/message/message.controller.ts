import { MessageService } from './message.service'
import { MessageCreateProps, MessageUpdateProps } from './message.model'
import { AuthUser } from '../../types/auth.type'

export class MessageController {
  static async addMessageController(payload: MessageCreateProps) {
    const messageId = await MessageService.addMessage(payload)
    return {
      status: 'success',
      data: messageId,
    }
  }

  static async getAllMessageController() {
    const data = await MessageService.getAllMessage()
    return {
      status: 'success',
      data,
    }
  }

  static async updateMessageController(
    payload: MessageUpdateProps,
    messageId: string,
    userWhoUpdated: AuthUser
  ) {
    await MessageService.getMessageById(messageId)
    const message = await MessageService.updateMessageById(
      payload,
      messageId,
      userWhoUpdated.user_id
    )
    return {
      status: 'success',
      data: message,
    }
  }

  static async deleteMessageController(messageId: string) {
    await MessageService.getMessageById(messageId)
    const message = await MessageService.deleteMessageById(messageId)

    return {
      status: 'success',
      message: `Menghapus message dari ${message} berhasil`,
    }
  }
}
