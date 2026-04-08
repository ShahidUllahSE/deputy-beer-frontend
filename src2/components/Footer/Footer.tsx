import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FooterContainer,
  Container,
  FooterContent,
  FooterLogo,
  FooterTagline,
  FooterLinks,
  FooterLink,
  FooterContact,
  FooterEmail,
  FooterHashtags,
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
          {/* Logo */}
          <FooterLogo onClick={() => navigate("/")}>
            Deputy Beer
          </FooterLogo>

          {/* Tagline */}
          <FooterTagline>Bring De Vibes to the Caribbean</FooterTagline>

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
            <FooterEmail>Contact Support: deputybeer@example.com</FooterEmail>
          </FooterContact>

          {/* Hashtags */}
          <FooterHashtags>
            Hashtags: #DeputyBeer #CaribbeanFestivals #WinBig
          </FooterHashtags>

          {/* Copyright */}
          <FooterNote>{copyrightText}</FooterNote>
        </FooterContent>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
