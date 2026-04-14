import { PoolClient } from 'pg'
import { ResourceNotFoundError } from '../../../exceptions/client.error'
import { supabasePool } from '../../../supabase/supabasePool'
import {
  CourseBenefitProps,
  CourseBenefitRequest,
  CourseBenefitResponse,
} from './course-benefit.model'

export interface CourseBenefitRow {
  course_benefit_id: string
  course_benefit_title: string
  course_benefit_description: string
}

export const mapToResponse = (
  courseBenefit: CourseBenefitRow
): CourseBenefitResponse => {
  return {
    id: courseBenefit.course_benefit_id,
    title: courseBenefit.course_benefit_title,
    description: courseBenefit.course_benefit_description,
  }
}

export class CourseBenefitService {
  static async getAllCourseBenefit() {
    const { rows } = await supabasePool.query(
      `SELECT course_benefit_id as id, course_benefit_title as title, course_benefit_description as description
      FROM course_benefits`
    )
    return rows
  }

  static async replaceCourseBenefits(
    client: PoolClient,
    courseId: string,
    benefits: CourseBenefitProps
  ) {
    await client.query(
      `DELETE FROM courses_course_benefits WHERE ccb_course_id = $1`,
      [courseId]
    )

    for (const b of benefits) {
      await client.query(
        `INSERT INTO courses_course_benefits(
            ccb_course_id, ccb_benefit_id, ccb_order_num)
          VALUES ($1, $2, $3)`,
        [courseId, b.courseBenefitId, b.orderNum]
      )
    }
  }

  static async getCourseBenefitByCourseId(courseId: string) {
    const { rows } = await supabasePool.query(
      `SELECT cb.course_benefit_title as title, cb.course_benefit_description as description
        FROM course_benefits cb 
        JOIN courses_course_benefits ccb 
          ON cb.course_benefit_id = ccb.ccb_benefit_id
        WHERE ccb.ccb_course_id = $1
        ORDER BY ccb.ccb_order_num ASC`,
      [courseId]
    )
    return rows
  }

  static async addCourseBenefit(courseBenefit: CourseBenefitRequest) {
    const { rows } = await supabasePool.query<CourseBenefitRow>(
      `INSERT INTO course_benefits (course_benefit_title, course_benefit_description)
        VALUES ($1, $2) RETURNING *`,
      [courseBenefit.title, courseBenefit.description]
    )
    return mapToResponse(rows[0])
  }

  static async updateCourseBenefit(
    courseBenefitId: string,
    courseBenefit: CourseBenefitRequest
  ) {
    const { rows } = await supabasePool.query<CourseBenefitRow>(
      `UPDATE course_benefits 
        SET course_benefit_title = $1, course_benefit_description = $2 
        WHERE course_benefit_id = $3
        RETURNING *`,
      [courseBenefit.title, courseBenefit.description, courseBenefitId]
    )
    if (rows.length === 0) {
      throw new ResourceNotFoundError('Resource course benefit tidak ditemukan')
    }
    return mapToResponse(rows[0])
  }

  static async checkCourseBenefitAssigned(courseBenefitId: string) {
    const { rows } = await supabasePool.query(
      `SELECT * FROM courses_course_benefits WHERE ccb_benefit_id = $1`,
      [courseBenefitId]
    )
    return rows.length > 0
  }

  static async deleteCourseBenefitById(courseBenefitId: string) {
    const { rows } = await supabasePool.query(
      `DELETE FROM course_benefits WHERE course_benefit_id = $1 RETURNING *`,
      [courseBenefitId]
    )
    if (rows.length === 0) {
      throw new ResourceNotFoundError('Resource course benefit tidak ditemukan')
    }
  }
}
