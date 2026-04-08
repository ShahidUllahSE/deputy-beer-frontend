import React from "react";
import { useNavigate } from "react-router-dom";
import deputyLogo from "../../assets/deputyfooterlogo.png";
import {
  FooterContainer,
  Container,
  FooterContent,
  FooterLogo,
  FooterLinks,
  FooterLink,
  FooterContact,
  FooterEmail,
  FooterNote,
} from "./Footer.styles";

export interface FooterProps {
  copyrightText: string;
}

const Footer: React.FC<FooterProps> = ({ copyrightText }) => {
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          {/* Logo - image sized like the text (large, prominent) */}
          <FooterLogo onClick={() => navigate("/")}>
            <img src={deputyLogo} alt="Deputy Beer" />
          </FooterLogo>

          {/* Terms & Conditions and Privacy Links */}
          <FooterLinks>
            <FooterLink onClick={() => navigate("/terms-conditions")}>
              Terms & Conditions
            </FooterLink>
            <FooterLink onClick={() => navigate("/privacy")}>
              Privacy Policy
            </FooterLink>
          </FooterLinks>

          {/* Contact Information */}
          <FooterContact>
            <FooterEmail>
              Contact Support: deputypromotions@gmail.com
            </FooterEmail>
          </FooterContact>

          {/* Copyright */}
          <FooterNote>{copyrightText}</FooterNote>
        </FooterContent>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
