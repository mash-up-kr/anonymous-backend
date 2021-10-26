import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { SwaggerMethodDoc } from "src/utils/types";
import { CommentsController } from "./comments.controller";

export const docs: SwaggerMethodDoc<CommentsController> = {
    create(summary: string) {
        return applyDecorators(
            ApiOperation({
                summary,
            }),
            ApiUnauthorizedResponse(),
        );
    },
    findAll(summary: string) {
        return applyDecorators(
            ApiOperation({
                summary,
            }),
        );
    },
    update(summary: string) {
        return applyDecorators(
            ApiOperation({
                summary,
            }),
            ApiUnauthorizedResponse(),
        );
    },
    remove(summary: string) {
        return applyDecorators(
            ApiOperation({
                summary,
            }),
            ApiUnauthorizedResponse(),
        );
    },
};
