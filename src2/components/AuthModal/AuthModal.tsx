import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/auth";
import { apiService } from "../../services/api";
import {
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalTitle,
  FormContainer,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
  FooterText,
  SwitchText,
  ButtonDiv,
} from "./AuthModal.styles";

interface SignInFormData {
  email: string;
  password: string;
}

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  isOver18: boolean;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
  onSignUpSuccess?: (email: string) => void;
}

const signInSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const signUpSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  isOver18: yup
    .boolean()
    .oneOf([true], "You must be 18 or older to participate")
    .required("Age confirmation is required"),
});

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "signin",
  onSignUpSuccess,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  const signInForm = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const onSignIn = async (data: SignInFormData) => {
    setLoading(true);
    try {
      const response = await apiService.login(data.email, data.password);

      // Store in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.user._id);
      localStorage.setItem("username", response.user.name);
      if (response.user.role) {
        localStorage.setItem("role", response.user.role);
      }

      dispatch(
        login({
          token: response.token,
          userId: response.user._id,
          username: response.user.name,
          role: response.user.role || 'user',
        })
      );

      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.user._id);
      localStorage.setItem("username", response.user.name);
      if (response.user.role) {
        localStorage.setItem("role", response.user.role);
      }

      toast.success("Sign in successful! Welcome back!");
      signInForm.reset();
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onSignUp = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      const userData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        date_of_birth: data.dateOfBirth,
        is_over_18: data.isOver18,
      };

      const response = await apiService.register(userData);

      toast.success(
        response.message ||
          "Registration successful! Please check your email for the verification code."
      );

      signUpForm.reset();
      onClose();
      // Trigger OTP modal instead of navigating
      if (onSignUpSuccess) {
        onSignUpSuccess(data.email);
      } else {
        navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          ×
        </ModalCloseButton>
        <ModalTitle>{mode === "signin" ? "Sign In" : "Sign Up"}</ModalTitle>

        {mode === "signin" ? (
          <FormContainer>
            <form onSubmit={signInForm.handleSubmit(onSignIn)}>
              <FormGroup>
                <Label>Email*</Label>
                <Input
                  {...signInForm.register("email")}
                  type="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage>
                  {signInForm.formState.errors.email?.message}
                </ErrorMessage>
              </FormGroup>

              <FormGroup>
                <Label>Password*</Label>
                <Input
                  {...signInForm.register("password")}
                  type="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage>
                  {signInForm.formState.errors.password?.message}
                </ErrorMessage>
              </FormGroup>

              <ButtonDiv>
                <SubmitButton type="submit" disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </SubmitButton>
              </ButtonDiv>
            </form>

            <FooterText>
              Don't have an account?{" "}
              <SwitchText onClick={() => setMode("signup")}>
                Sign Up
              </SwitchText>
            </FooterText>
          </FormContainer>
        ) : (
          <FormContainer>
            <form onSubmit={signUpForm.handleSubmit(onSignUp)}>
              <FormGroup>
                <Label>First Name*</Label>
                <Input
                  {...signUpForm.register("firstName")}
                  placeholder="Enter your first name"
                />
                <ErrorMessage>
                  {signUpForm.formState.errors.firstName?.message}
                </ErrorMessage>
              </FormGroup>

              <FormGroup>
                <Label>Last Name*</Label>
                <Input
                  {...signUpForm.register("lastName")}
                  placeholder="Enter your last name"
                />
                <ErrorMessage>
                  {signUpForm.formState.errors.lastName?.message}
                </ErrorMessage>
              </FormGroup>

              <FormGroup>
                <Label>Email*</Label>
                <Input
                  {...signUpForm.register("email")}
                  type="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage>
                  {signUpForm.formState.errors.email?.message}
                </ErrorMessage>
              </FormGroup>

              <FormGroup>
                <Label>Password*</Label>
                <Input
                  {...signUpForm.register("password")}
                  type="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage>
                  {signUpForm.formState.errors.password?.message}
                </ErrorMessage>
              </FormGroup>

              <FormGroup>
                <Label>Confirm Password*</Label>
                <Input
                  {...signUpForm.register("confirmPassword")}
                  type="password"
                  placeholder="Confirm your password"
                />
                <ErrorMessage>
                  {signUpForm.formState.errors.confirmPassword?.message}
                </ErrorMessage>
              </FormGroup>

              <FormGroup>
                <Label>Date of Birth*</Label>
                <Input
                  {...signUpForm.register("dateOfBirth")}
                  type="date"
                  placeholder="Enter your date of birth"
                />
                <ErrorMessage>
                  {signUpForm.formState.errors.dateOfBirth?.message}
                </ErrorMessage>
              </FormGroup>

              <FormGroup>
                <Label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  <input
                    {...signUpForm.register("isOver18")}
                    type="checkbox"
                    style={{
                      width: "14px",
                      height: "14px",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  />
                  I confirm that I am 18 years or older*
                </Label>
                <ErrorMessage>
                  {signUpForm.formState.errors.isOver18?.message}
                </ErrorMessage>
              </FormGroup>

              <ButtonDiv>
                <SubmitButton type="submit" disabled={loading}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </SubmitButton>
              </ButtonDiv>
            </form>

            <FooterText>
              Already have an account?{" "}
              <SwitchText onClick={() => setMode("signin")}>
                Sign In
              </SwitchText>
            </FooterText>
          </FormContainer>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default AuthModal;
