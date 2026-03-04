import { ApiResponse } from '../../../types/response.type'
import { ResponseHelper } from '../../../utils/responseHelper'
import { CourseFieldParams, CourseFieldRequest } from './courses-field.model'
import { CourseFieldService } from './courses-field.service'

export class CourseFieldController {
  static async getAllCourseFieldController(): Promise<ApiResponse> {
    const courseField = await CourseFieldService.getAllCourseField()
    return ResponseHelper.success(
      'Mengambil data course field berhasil',
      courseField
    )
  }

  static async addCourseFieldController(
    body: CourseFieldRequest
  ): Promise<ApiResponse> {
    const courseField = await CourseFieldService.addCourseField(body)
    return ResponseHelper.created('Menambah course field berhasil', courseField)
  }

  static async updateCourseFieldController(
    body: CourseFieldRequest,
    params: CourseFieldParams
  ): Promise<ApiResponse> {
    const courseField = await CourseFieldService.updateCourseField(
      params.courseFieldId,
      body
    )
    return ResponseHelper.success('Mengubah course field berhasil', courseField)
  }

  static async deleteCourseFieldController(
    params: CourseFieldParams
  ): Promise<ApiResponse> {
    await CourseFieldService.deleteCourseFieldById(params.courseFieldId)

    return ResponseHelper.success('Menghapus course field berhasil')
  }
}
