import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Content,
  Header,
  Section,
  SectionTitle,
  Text,
  BackButton,
} from "./Privacy.styles";
import Footer from "../../components/Footer/Footer";

const Privacy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Content>
          <BackButton onClick={() => navigate("/")}>← Back to Home</BackButton>
          
          <Header>Privacy Policy - Deputy Beer Campaign</Header>

          <Section>
            <Text>
              Deputy Beer ("we," "our," or "us") values your privacy. This
              Privacy Policy explains how we collect, use, store, and protect
              your personal information when you participate in the Deputy Beer
              UTC Campaign.
            </Text>
            <Text>
              By using this campaign platform, you agree to the terms of this
              Privacy Policy.
            </Text>
          </Section>

          <Section>
            <SectionTitle>1. Information We Collect</SectionTitle>
            <Text>
              We collect information that you provide directly to us, including:
            </Text>
            <ul>
              <li>Name and email address</li>
              <li>Date of birth and age verification</li>
              <li>QR code scan data</li>
              <li>Entry submissions</li>
              <li>Points and activity history</li>
            </ul>
          </Section>

          <Section>
            <SectionTitle>2. How We Use Your Information</SectionTitle>
            <Text>We use your information to:</Text>
            <ul>
              <li>Process your campaign entries</li>
              <li>Award points and track your participation</li>
              <li>Verify your eligibility for prizes</li>
              <li>Communicate with you about the campaign</li>
              <li>Improve our services</li>
            </ul>
          </Section>

          <Section>
            <SectionTitle>3. Data Security</SectionTitle>
            <Text>
              We implement appropriate security measures to protect your
              personal information. However, no method of transmission over the
              internet is 100% secure.
            </Text>
          </Section>

          <Section>
            <SectionTitle>4. Data Sharing</SectionTitle>
            <Text>
              We do not sell your personal information. We may share your
              information only with service providers who assist us in operating
              the campaign, and only as necessary to fulfill the campaign
              requirements.
            </Text>
          </Section>

          <Section>
            <SectionTitle>5. Your Rights</SectionTitle>
            <Text>You have the right to:</Text>
            <ul>
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of communications</li>
            </ul>
          </Section>

          <Section>
            <SectionTitle>6. Contact Us</SectionTitle>
            <Text>
              If you have questions about this Privacy Policy, please contact us
              at privacy@deputybeer.com
            </Text>
          </Section>

          <Section>
            <Text style={{ fontSize: "12px", color: "#999", marginTop: "2rem" }}>
              Last updated: {new Date().toLocaleDateString()}
            </Text>
          </Section>
        </Content>
      </Container>
      <Footer copyrightText="© 2026 Deputy Beer Campaign. All rights reserved." />
    </>
  );
};

export default Privacy;
