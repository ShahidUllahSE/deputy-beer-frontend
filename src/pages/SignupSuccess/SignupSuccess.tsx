import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fireSignupSuccessPixels } from "../../utils/pixels";
import { Container, Card, Title, Subtitle, PrimaryButton } from "./SignupSuccess.styles";

const SignupSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const order = searchParams.get("order");
    fireSignupSuccessPixels(order);
  }, [searchParams]);

  return (
    <Container>
      <Card>
        <Title>Signup successful</Title>
        <Subtitle>You can now sign in and start your entry.</Subtitle>
        <PrimaryButton onClick={() => navigate("/")}>Go to Home</PrimaryButton>
      </Card>
    </Container>
  );
};

export default SignupSuccess;

