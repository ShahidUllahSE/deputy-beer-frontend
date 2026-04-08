import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  FormContainer,
  Title,
  Underline,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
  FooterText,
  SwitchText,
  ButtonDiv,
} from "./SignUp.styles";
import { apiService } from "../../services/api";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  isOver18: boolean;
}

const schema = yup.object().shape({
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
  dateOfBirth: yup
    .string()
    .required("Date of birth is required"),
  isOver18: yup
    .boolean()
    .oneOf([true], "You must be 18 or older to participate")
    .required("Age confirmation is required"),
});

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
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
        response.message || "Registration successful! Please check your email for the verification code."
      );
      
      // Redirect to OTP verification page with email
      navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
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

  return (
    <Container>
      <FormContainer>
        <Title>Sign Up</Title>
        <Underline />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>First Name*</Label>
            <Input
              {...register("firstName")}
              placeholder="Enter your first name"
            />
            <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
          </FormGroup>

          <FormGroup>
            <Label>Last Name*</Label>
            <Input
              {...register("lastName")}
              placeholder="Enter your last name"
            />
            <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
          </FormGroup>

          <FormGroup>
            <Label>Email*</Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </FormGroup>

          <FormGroup>
            <Label>Password*</Label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </FormGroup>

          <FormGroup>
            <Label>Confirm Password*</Label>
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm your password"
            />
            <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
          </FormGroup>

          <FormGroup>
            <Label>Date of Birth*</Label>
            <Input
              {...register("dateOfBirth")}
              type="date"
              placeholder="Enter your date of birth"
            />
            <ErrorMessage>{errors.dateOfBirth?.message}</ErrorMessage>
          </FormGroup>

          <FormGroup>
            <Label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                {...register("isOver18")}
                type="checkbox"
                style={{ width: "18px", height: "18px", cursor: "pointer" }}
              />
              I confirm that I am 18 years or older*
            </Label>
            <ErrorMessage>{errors.isOver18?.message}</ErrorMessage>
          </FormGroup>

          <ButtonDiv>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </SubmitButton>
          </ButtonDiv>
        </form>

        <FooterText>
          Already have an account?{" "}
          <SwitchText onClick={() => navigate("/signin")}>Sign In</SwitchText>
        </FooterText>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
