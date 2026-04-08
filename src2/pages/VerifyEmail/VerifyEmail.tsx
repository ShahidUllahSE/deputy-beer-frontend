import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  FormContainer,
  Title,
  Message,
  ButtonDiv,
  SubmitButton,
} from "./VerifyEmail.styles";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  const verifyEmail = async () => {
    // Email verification is now done via OTP code
    // This page is kept for backward compatibility
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.info("Email verification is now done via OTP code. Please use the OTP verification page.");
      navigate("/signin");
    }, 1000);
  };

  return (
    <Container>
      <FormContainer>
        <Title>Email Verification</Title>
        {loading ? (
          <Message>Verifying your email...</Message>
        ) : (
          <Message>Email verification is now done via OTP code. Please use the OTP verification page.</Message>
        )}
        <ButtonDiv>
          <SubmitButton onClick={() => navigate("/signin")}>
            Go to Sign In
          </SubmitButton>
        </ButtonDiv>
      </FormContainer>
    </Container>
  );
};

export default VerifyEmail;
