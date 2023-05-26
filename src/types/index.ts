// NOTE: Written global types here.
import type { Response } from 'express'

interface BaseResponseModel<T> {
  code?: number | string
  message?: string
  data?: T
}

export type BaseResponse<T = any> = Response<BaseResponseModel<T>>
