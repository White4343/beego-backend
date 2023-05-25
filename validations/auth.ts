import { body } from "express-validator";
import i18next from "i18next";

export const registerValidation = [
  body("email").isEmail().withMessage(i18next.t("USER.VALIDATIONS.ERROR_EMAIL")),
  body("password")
    .isLength({ min: 5 })
    .withMessage(i18next.t("USER.VALIDATIONS.ERROR_PASSWORD")),
  body("fullName")
    .isLength({ min: 2 })
    .withMessage(i18next.t("USER.VALIDATIONS.ERROR_NAME")),
];

export const loginValidation = [
  body("email").isEmail().withMessage(i18next.t("USER.VALIDATIONS.ERROR_EMAIL")),
  body("password")
      .isLength({ min: 5 })
      .withMessage(i18next.t("USER.VALIDATIONS.ERROR_PASSWORD")),
];
