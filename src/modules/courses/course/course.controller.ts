import { ApiResponse } from '../../../types/response.type'
import { AuthUser } from '../../../types/auth.type'
import { ResponseHelper } from '../../../utils/responseHelper'
import {
  CourseProps,
  ParamsCourseProps,
  QueryCourseProps,
} from './course.model'
import { CourseService } from './course.service'
import { CourseBenefitService } from '../courses-benefit/course-benefit.service'
import { CourseMaterialService } from './course-material/course_material.service'
import { CourseBatchService } from './course-batch/course-batch.service'
import { PageService } from '../../pages/page/page.service'
import { generateUniquePageSlug } from '../../../utils/slug'

export class CourseController {
  static async addCourseController(
    payload: CourseProps,
    user: AuthUser
  ): Promise<ApiResponse> {
    const parentPageId = await PageService.getParentPageId('Courses')
    const pageSlug = await generateUniquePageSlug(payload.courseTitle)

    const { page_id } = await PageService.addPage(
      payload.courseTitle,
      parentPageId,
      pageSlug,
      user.user_id
    )
    const course_id = await CourseService.addCourse(
      payload,
      user.user_id,
      page_id
    )
    return ResponseHelper.created('Menambah course berhasil', { course_id })
  }

  static async getAllCourseController(
    query: QueryCourseProps
  ): Promise<ApiResponse> {
    const courses = await CourseService.getAllCourses(query)
    return ResponseHelper.success(
      'Mengambil seluruh data course berhasil',
      courses
    )
  }

  static async getUpcomingCourseController(): Promise<ApiResponse> {
    const upcomingCourse = await CourseService.getUpcomingCourse()
    return ResponseHelper.success(
      'Mengambil data upcoming course berhasil',
      upcomingCourse
    )
  }

  static async getCourseByIdController(
    params: ParamsCourseProps
  ): Promise<ApiResponse> {
    const { courseId } = params
    await CourseService.verifyCourseisExist(courseId)
    const course = await CourseService.getCourseById(courseId)
    const courseBenefit =
      await CourseBenefitService.getCourseBenefitByCourseId(courseId)
    const courseMaterial =
      await CourseMaterialService.getCourseMaterialByCourseId(courseId)
    const courseBatch =
      await CourseBatchService.getCourseBatchByCourseId(courseId)

    const courseDetail = {
      ...course,
      courseBenefit,
      courseMaterial,
      courseBatch,
    }
    return ResponseHelper.success(
      'Mengambil data detail course berhasil',
      courseDetail
    )
  }

  static async updateCourseController(
    payload: Partial<CourseProps>,
    params: ParamsCourseProps,
    user: AuthUser
  ): Promise<ApiResponse> {
    const { courseId } = params
    await CourseService.verifyCourseisExist(courseId)
    const { course_title } = await CourseService.updateCourse(
      payload,
      courseId,
      user.user_id
    )
    return ResponseHelper.success(`Update course : ${course_title} berhasil`)
  }

  static async deleteCourseController(
    params: ParamsCourseProps
  ): Promise<ApiResponse> {
    const { courseId } = params
    await CourseService.verifyCourseisExist(courseId)
    const { course_title, course_page_id } =
      await CourseService.deleteCourse(courseId)
    await PageService.deletePage(course_page_id)
    return ResponseHelper.success(`Menghapus course: ${course_title} berhasil`)
  }
}
