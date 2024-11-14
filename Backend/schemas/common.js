import { checkSchema } from "express-validator";

export const mongoIDValidator = {
    in: ["params"],
    isMongoId: {
        errorMessage:"ID Invalido",
    },
};

// export const mongoIdValidatorSchema = checkSchema({
//     id: mongoIDValidator,
// });

// export const paginationValidationSchema = checkSchema ({
//     page: {
//         in: ["query"],
//         optional: {options: {nullable: true }},
//         isInt: {
//             options: {min: 1},
//             errorMessage: "Page must be a positive integer",
//         },
//         toInt: true,
//     },
//     limit: {
//         in: ["query"],
//         optional: {options: {nullable: true }},
//         isInt: {
//             options: {min: 1},
//             errorMessage: "Limit must be a positive integer",
//         },
//         toInt: true,
//     },
// });