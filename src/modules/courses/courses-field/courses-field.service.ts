import { ResourceNotFoundError } from '../../../exceptions/client.error'
import { supabasePool } from '../../../supabase/supabasePool'
import { CourseFieldRequest, CourseFieldResponse } from './courses-field.model'

export interface CourseFieldRow {
  course_field_id: string
  course_field_name: string
}

export const mapToResponse = (
  courseField: CourseFieldRow
): CourseFieldResponse => {
  return {
    id: courseField.course_field_id,
    field: courseField.course_field_name,
  }
}

export class CourseFieldService {
  static async getAllCourseField() {
    const { rows } = await supabasePool.query<CourseFieldRow>(
      `SELECT course_field_id, course_field_name FROM course_fields`
    )
    return rows.map((row) => mapToResponse(row))
  }

  static async addCourseField(courseField: CourseFieldRequest) {
    const { rows } = await supabasePool.query<CourseFieldRow>(
      `INSERT INTO course_fields (course_field_name)
        VALUES ($1) RETURNING *`,
      [courseField.fieldName]
    )
    return mapToResponse(rows[0])
  }

  static async updateCourseField(
    courseFieldId: string,
    courseField: CourseFieldRequest
  ) {
    const { rows } = await supabasePool.query<CourseFieldRow>(
      `UPDATE course_fields 
        SET course_field_name = $1 
        WHERE course_field_id = $2
        RETURNING *`,
      [courseField.fieldName, courseFieldId]
    )
    if (rows.length === 0) {
      throw new ResourceNotFoundError('Resource course field tidak ditemukan')
    }
    return mapToResponse(rows[0])
  }

  static async checkCourseFieldAssigned(courseFieldId: string) {
    const { rows } = await supabasePool.query(
      `SELECT * FROM courses WHERE field_id = $1`,
      [courseFieldId]
    )
    return rows.length > 0
  }

  static async deleteCourseFieldById(courseFieldId: string) {
    const { rows } = await supabasePool.query(
      `DELETE FROM course_fields WHERE course_field_id = $1 RETURNING *`,
      [courseFieldId]
    )
    if (rows.length === 0) {
      throw new ResourceNotFoundError('Resource course field tidak ditemukan')
    }
  }
}
