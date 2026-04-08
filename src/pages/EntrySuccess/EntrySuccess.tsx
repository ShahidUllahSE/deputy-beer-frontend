import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fireEntrySuccessPixels } from "../../utils/pixels";
import { Container, Card, Title, Subtitle, PrimaryButton } from "./EntrySuccess.styles";

const EntrySuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const order = searchParams.get("order");
    fireEntrySuccessPixels(order);
  }, [searchParams]);

  return (
    <Container>
      <Card>
        <Title>Entry submitted</Title>
        <Subtitle>Thanks! Your entry has been received. Good luck!</Subtitle>
        <PrimaryButton onClick={() => navigate("/history")}>View My History</PrimaryButton>
      </Card>
    </Container>
  );
};

export default EntrySuccess;

