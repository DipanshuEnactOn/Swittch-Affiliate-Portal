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
