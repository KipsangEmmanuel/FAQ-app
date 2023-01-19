import React, { useState } from "react";
import { Container, Header, Entity, Question, Inner, Text } from "./styles";

const QuestionContext = React.createContext();
export default function Banner({ children, ...restProps }) {
  return (
    <Container {...restProps}>
      <inner>{children}</inner>
    </Container>
  );
}
Banner.Header = function BannerHeader({ children, ...restProps }) {
  return <Header {...restProps}>{children}</Header>;
};

Banner.Entity = function BannerEntity({ children, ...restProps }) {
  const [open, setOpen] = useState(false);
  return (
    <QuestionContext.Provider value={{ open, setOpen }}>
      <Entity {...restProps}> {children} </Entity>
    </QuestionContext.Provider>
  );
};

Banner.Question = function BunnerQuestion({ children, ...restProps }) {
  const { open, setOpen } = React.useContext(QuestionContext);

  return (
    <Question onClick={() => setOpen((open) => !open)} {...restProps}>
      {children}
      {open ? <h3>^</h3> : <h3>+</h3>}
    </Question>
  );
};

Banner.Text = function BannerText({ children, ...restProps }) {
  const { open } = React.useContext(QuestionContext);
  return open ? <Text {...restProps}>{children}</Text> : null;
};
