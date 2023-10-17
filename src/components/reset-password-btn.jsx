import styled from "styled-components";
import { Link } from "react-router-dom";

const ResetLink = styled(Link)`
  font-weight: 500;
  width: 100%;
  color: #218bff;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export default function ResetPasswordButton() {
  return <ResetLink to="/reset">Forgot Password?</ResetLink>;
}
