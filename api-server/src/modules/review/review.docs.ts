import { applyDecorators } from "@nestjs/common"
import { ApiCreatedResponse, ApiResponse } from "@nestjs/swagger"
import { Review } from "src/entities/review.entity"
import { ReviewController } from "./review.controller"

type SwaggerMethodDoc<T> = {
    [K in keyof T]: () => MethodDecorator;
}

export const ApiDocs: SwaggerMethodDoc<ReviewController> = {
    create() {
        return applyDecorators(
            ApiCreatedResponse({ description: 'The record has been successfully created.', type: Review})
        )
    },
    findAll() {
        return applyDecorators(
            ApiResponse({ status: 200, description: '리뷰'})
        )
    },
    findOne() {
        return applyDecorators(
            ApiResponse({ status: 200, description: '리뷰'})
        )
    },
    update() {
        return applyDecorators(
            ApiResponse({ status: 200, description: '리뷰'})
        )
    },
    remove() {
        return applyDecorators(
            ApiResponse({ status: 200, description: '리뷰'})
        )
    }
}