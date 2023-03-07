import { useSelector } from "react-redux";
import { selectData } from "../pages/homeSlice";
import { Link } from "react-scroll";
import styled from "styled-components";
// Icons
import { FaChevronCircleDown } from "react-icons/fa";
// Media
import { Light, Dark } from "../data";
// Components
import { Col, Container, Row } from "react-bootstrap";
import SocialLinks from "./SocialLinks";

const StyledHero = styled.header`
  position: relative;
  display: grid;
  place-items: center;
  max-width: 1920px;
  margin: 0 auto;
  min-height: calc(100vh - var(--nav-height));
  perspective-origin: var(--mouse-x) top;
  overflow-y: clip;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "linear-gradient(135deg, var(--primary), var(--bs-light))"
        : "linear-gradient(135deg, var(--primary), var(--bs-dark))"};
    background: ${({ theme }) =>
      theme.name === "light"
        ? `url(${Light}) center center fixed no-repeat`
        : `url(${Dark}) center center fixed no-repeat`};
    background-clip: content-box;
    background-size: 100vw 100%;
    z-index: -2;
  }

  /* Overlay for contrast */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      theme.name === "light"
        ? `linear-gradient(180deg,rgba(255, 255, 255, 0.5), ${theme.background})`
        : `linear-gradient(180deg,rgba(0, 0, 0, 0.2), ${theme.background})`};
    z-index: -1;
  }

  .down-container {
    height: 10rem;
  }

  @media screen and (min-width: 1180px) {
    perspective: 200px;
    &::before {
      transform:  perspective(2000px) rotateX(2deg) scale(1.2);
    }
  }

  @media screen and (min-width: 1367px) {
    perspective: 400px;
    &::before {
      transform:  perspective(400px) rotateX(2deg) scale(1.5);
    }
  }
`;

function between(x, min, max) {
  if (x > max) return max;
  if (x < min) return min;
  return x;
}

export default function Hero() {
  const { name } = useSelector(selectData);

  const handleMouseMove = (e) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();

    target.style.setProperty("--mouse-x", `${between(Math.floor((e.clientX / rect.right) * 100),30,70)}%`);
  };

  return (
    <StyledHero onMouseMove={handleMouseMove}>
      <Container>
        <Row className="align-items-center text-center">
          <Col>
            <h1 className="mb-3 display-3 title">{name}</h1>
            <div className="d-flex align-items-center justify-content-center">
              <SocialLinks />
            </div>
          </Col>
        </Row>
        <Row className="align-items-end down-container">
          <Col className="m-4 text-center">
            <Link to={"About"} className="link-icons">
              <FaChevronCircleDown />
            </Link>
          </Col>
        </Row>
      </Container>
    </StyledHero>
  );
}
