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
} from "./Terms.styles";
import Footer from "../../components/Footer/Footer";

const Terms: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Content>
          <BackButton onClick={() => navigate("/")}>← Back to Home</BackButton>
          
          <Header>Terms & Conditions - Deputy Beer Campaign</Header>

          <Section>
            <Text>
              These Terms and Conditions ("Terms") govern your participation in
              the Deputy Beer UTC Campaign ("Campaign"). By participating, you
              agree to these Terms in full. If you do not agree, do not
              participate.
            </Text>
          </Section>

          <Section>
            <SectionTitle>1. Eligibility</SectionTitle>
            <Text>
              You must be 18 years or older to participate. You must provide
              accurate information during registration. Only one account per
              person is allowed.
            </Text>
          </Section>

          <Section>
            <SectionTitle>2. How to Participate</SectionTitle>
            <Text>To enter the Campaign:</Text>
            <ul>
              <li>Register for an account and verify your email</li>
              <li>Scan or upload 4 unique QR codes from Deputy Beer crowns</li>
              <li>Submit your entry</li>
              <li>Each set of 4 QR codes equals one entry</li>
            </ul>
          </Section>

          <Section>
            <SectionTitle>3. QR Code Rules</SectionTitle>
            <Text>
              Each QR code can only be used once. You cannot use the same QR
              code multiple times. Duplicate QR codes in a single entry are not
              allowed. QR codes must be valid and not previously used.
            </Text>
          </Section>

          <Section>
            <SectionTitle>4. Points System</SectionTitle>
            <Text>
              Scanning QR codes awards points to your account. Points are
              tracked for your participation history but do not affect entry
              eligibility. Each QR code scan awards points as specified.
            </Text>
          </Section>

          <Section>
            <SectionTitle>5. Prizes</SectionTitle>
            <Text>
              Winners are selected weekly. 10 winners are announced every week.
              Prizes include trips for 4 people to Caribbean music festivals.
              Winners will be notified via email.
            </Text>
          </Section>

          <Section>
            <SectionTitle>6. Prohibited Activities</SectionTitle>
            <Text>You may not:</Text>
            <ul>
              <li>Use automated systems to scan QR codes</li>
              <li>Share or duplicate QR codes</li>
              <li>Create multiple accounts</li>
              <li>Manipulate or tamper with the system</li>
              <li>Violate these Terms in any way</li>
            </ul>
          </Section>

          <Section>
            <SectionTitle>7. Account Responsibility</SectionTitle>
            <Text>
              You are responsible for maintaining the security of your account.
              You must notify us immediately of any unauthorized use of your
              account.
            </Text>
          </Section>

          <Section>
            <SectionTitle>8. Privacy & Data</SectionTitle>
            <Text>
              Use of the Campaign is governed by our{" "}
              <strong>Privacy Policy</strong>, which explains how we collect,
              use, and protect your information. By participating, you consent
              to our data practices as described in the Privacy Policy.
            </Text>
          </Section>

          <Section>
            <SectionTitle>9. Modifications</SectionTitle>
            <Text>
              We reserve the right to modify these Terms at any time. Continued
              participation after changes constitutes acceptance of the new
              Terms.
            </Text>
          </Section>

          <Section>
            <SectionTitle>10. Limitation of Liability</SectionTitle>
            <Text>
              We are not liable for any technical issues, system failures, or
              circumstances beyond our control that may affect your
              participation.
            </Text>
          </Section>

          <Section>
            <SectionTitle>11. Governing Law</SectionTitle>
            <Text>
              These Terms are governed by applicable local laws. Disputes will
              be resolved through appropriate legal channels.
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

export default Terms;
