import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters")
    .required("Password is required"),
});

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters")
    .required("Password is required"),
});

export const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(8, "Current password must be at least 8 characters")
    .max(50, "Current password must be at most 50 characters")
    .required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "New password must be at least 8 characters")
    .max(50, "New password must be at most 50 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .min(8, "Confirm password must be at least 8 characters")
    .max(50, "Confirm password must be at most 50 characters")
    .required("Confirm password is required"),
});

export const PersonalInformationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const AffiliateLinkSchema = Yup.object({
  link: Yup.string()
    .required("URL is required")
    .min(3, "URL must be at least 3 characters")
    .max(50, "URL must be less than 50 characters")
    .matches(
      /^[a-zA-Z0-9-_]+$/,
      "URL can only contain letters, numbers, hyphens, and underscores"
    ),
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
});

export const PayPalSchema = Yup.object().shape({
  paypalId: Yup.string()
    .email("Please enter a valid email address")
    .required("PayPal ID is required"),
});

export const BankDetailsSchema = Yup.object().shape({
  bankName: Yup.string().required("Bank name is required"),
  accountNumber: Yup.string()
    .matches(/^\d+$/, "Account number must contain only digits")
    .min(8, "Account number must be at least 8 digits")
    .required("Account number is required"),
  ifscBicCode: Yup.string()
    .matches(/^[A-Z0-9]+$/, "Please enter a valid IFSC/BIC code")
    .min(4, "Code must be at least 4 characters")
    .required("IFSC/BIC code is required"),
  accountHolderName: Yup.string().required("Account holder name is required"),
  accountType: Yup.string().required("Account type is required"),
  swiftCode: Yup.string()
    .matches(/^[A-Z0-9]{8,11}$/, "SWIFT code must be 8-11 characters")
    .optional(),
});

export const postbackSchema = Yup.object().shape({
  postbackType: Yup.string().required("Please select a postback type"),
  globalUrl: Yup.string().when("postbackType", {
    is: "global",
    then: (schema) =>
      schema
        .required("Global URL is required")
        .test("is-url", "Please enter a valid URL", (value) => {
          try {
            new URL(value);
            return true;
          } catch {
            return false;
          }
        }),
  }),
  selectedGoal: Yup.string().when("postbackType", {
    is: "goal",
    then: (schema) => schema.required("Please select a goal"),
    otherwise: (schema) => schema.notRequired(),
  }),
  goalUrl: Yup.string().when("postbackType", {
    is: "goal",
    then: (schema) =>
      schema
        .required("Goal URL is required")
        .test("is-url", "Please enter a valid URL", (value) => {
          try {
            new URL(value);
            return true;
          } catch {
            return false;
          }
        }),
    otherwise: (schema) => schema.notRequired(),
  }),
});
