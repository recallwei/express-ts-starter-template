// NOTE: Written global types here.
import type { Response } from 'express'

interface BaseResponseModel {
  code?: number | string
  message?: string
}

interface OKResponseModel<T> extends BaseResponseModel {
  data?: T
}

export type BaseResponse = Response<BaseResponseModel>

export type OKResponse<T> = Response<OKResponseModel<T>>
