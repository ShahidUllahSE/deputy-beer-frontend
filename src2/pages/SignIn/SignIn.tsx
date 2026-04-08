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
} from "./SignIn.styles";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/auth";
import { apiService } from "../../services/api";

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await apiService.login(data.email, data.password);

      dispatch(
        login({
          token: response.token,
          userId: response.user._id,
          username: response.user.name,
        })
      );

      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.user._id);
      localStorage.setItem("username", response.user.name);

      toast.success("Sign in successful! Welcome back!");
      navigate("/");
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

  return (
    <Container>
      <FormContainer>
        <Title>Sign In</Title>
        <Underline />
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <ButtonDiv>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </SubmitButton>
          </ButtonDiv>
        </form>

        <FooterText>
          Don't have an account?{" "}
          <SwitchText onClick={() => navigate("/signup")}>Sign Up</SwitchText>
        </FooterText>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
