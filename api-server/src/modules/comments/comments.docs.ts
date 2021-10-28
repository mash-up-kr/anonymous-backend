import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { SwaggerMethodDoc } from "src/utils/types";
import { CommentsController } from "./comments.controller";

export const docs: SwaggerMethodDoc<CommentsController> = {
    create(summary: string) {
        return applyDecorators(
            ApiOperation({
                summary,
            }),
            ApiUnauthorizedResponse(),
            ApiBearerAuth(),
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
            ApiBearerAuth(),
        );
    },
    remove(summary: string) {
        return applyDecorators(
            ApiOperation({
                summary,
            }),
            ApiUnauthorizedResponse(),
            ApiBearerAuth(),
        );
    },
};
