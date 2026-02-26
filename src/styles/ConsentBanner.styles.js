import styled from "styled-components";

// Styled components for the banner and button
export const Banner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #0d344d;
  padding: 1.25rem;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
  text-align: center;
  z-index: 1000;
  color: #fff;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.875rem;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;

export const ConsentButton = styled.button`
  margin: 0 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: #ff8c00;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #ff6f00;
    transform: translateY(-2px);
  }

  &:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
    background-color: #ff6f00;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    margin: 0.25rem;
  }
`;

export const CancelButton = styled.button`
  margin: 0 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: #999;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #777;
    transform: translateY(-2px);
  }

  &:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
    background-color: #777;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    margin: 0.25rem;
  }
`;
