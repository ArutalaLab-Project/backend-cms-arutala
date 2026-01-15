import { AuthUser } from '../../types/auth.type'
import { uploadToStorage } from '../../utils/uploadToStorage'
import { MentorCreateProps } from './mentor.model'
import { MentorService } from './mentor.service'

export class MentorController {
  static async uploadProfileController(profile: File) {
    const urlProfile = await uploadToStorage(profile, '/mentor')
    return {
      status: 'success',
      data: {
        urlProfile,
      },
    }
  }

  static async addMentorController(payload: MentorCreateProps, user: AuthUser) {
    const { mentors_id } = await MentorService.addMentor(payload, user.user_id)
    return {
      status: 'success',
      data: {
        mentors_id,
      },
    }
  }

  static async getAllMentorController() {
    const mentors = await MentorService.getAllMentor()
    return {
      status: 'success',
      data: mentors,
    }
  }

  static async updateMentorController(
    mentorId: string,
    payload: MentorCreateProps,
    user: AuthUser
  ) {
    await MentorService.getMentorById(mentorId)
    const { mentors_id } = await MentorService.updateMentor(
      mentorId,
      payload,
      user.user_id
    )
    return {
      status: 'success',
      data: {
        mentors_id,
      },
    }
  }

  static async deleteMentorController(mentorId: string) {
    await MentorService.getMentorById(mentorId)
    const mentor = await MentorService.deleteMentor(mentorId)
    return {
      status: 'success',
      data: mentor,
    }
  }
}
