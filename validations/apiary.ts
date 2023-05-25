import { body } from 'express-validator';
import i18next from "i18next";

export const apiaryCreateValidation = [
  body('name').isLength({ min: 3 }).withMessage(i18next.t("VALIDATIONS.ERROR_NAME")),
  body('description').isLength({ min: 3 }).withMessage(i18next.t("VALIDATIONS.ERROR_NAME")),
];
