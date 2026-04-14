import { BadRequest } from '../../../exceptions/client.error'
import { ApiResponse } from '../../../types/response.type'
import { ResponseHelper } from '../../../utils/responseHelper'
import {
  CourseBenefitParams,
  CourseBenefitRequest,
} from './course-benefit.model'
import { CourseBenefitService } from './course-benefit.service'

export class CourseBenefitController {
  static async getAllCourseBenefitController(): Promise<ApiResponse> {
    const courseBenefit = await CourseBenefitService.getAllCourseBenefit()
    return ResponseHelper.success(
      'Mengambil data Course Benefit Berhasil',
      courseBenefit
    )
  }

  static async addCourseBenefitController(
    body: CourseBenefitRequest
  ): Promise<ApiResponse> {
    const courseBenefit = await CourseBenefitService.addCourseBenefit(body)
    return ResponseHelper.created(
      'Menambah course benefit berhasil',
      courseBenefit
    )
  }

  static async updateCourseBenefitController(
    body: CourseBenefitRequest,
    params: CourseBenefitParams
  ): Promise<ApiResponse> {
    const courseBenefit = await CourseBenefitService.updateCourseBenefit(
      params.courseBenefitId,
      body
    )
    return ResponseHelper.success(
      'Mengubah course benefit berhasil',
      courseBenefit
    )
  }

  static async deleteCourseBenefitController(
    params: CourseBenefitParams
  ): Promise<ApiResponse> {
    const isAssigned = await CourseBenefitService.checkCourseBenefitAssigned(
      params.courseBenefitId
    )
    if (isAssigned) {
      throw new BadRequest(
        'Course benefit tidak dapat dihapus karena sudah digunakan pada courses'
      )
    }
    await CourseBenefitService.deleteCourseBenefitById(params.courseBenefitId)

    return ResponseHelper.success('Menghapus course benefit berhasil')
  }
}
