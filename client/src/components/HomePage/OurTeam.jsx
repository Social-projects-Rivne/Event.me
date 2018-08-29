import React from 'react';
import { Row, Col, Card, CardTitle } from 'react-materialize';


const OurTeam = () => {
  return (
    <Row>
      <Col s={3}>
        <Card className='large'
          header={
            <CardTitle
              image='/default-avatar-team.jpg'>
              Person Zero
                </CardTitle>
          }>
          I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.
            </Card>
      </Col>
      <Col s={3}>
        <Card className='large'
          header={
            <CardTitle
              image='/default-avatar-team.jpg'>
              Person One
            </CardTitle>
          }>
          I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.
            </Card>
      </Col>
      <Col s={3}>
        <Card className='large'
          header={
            <CardTitle
              image='/default-avatar-team.jpg'>
              Person Two
            </CardTitle>
          }>
          I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.
            </Card>
      </Col>
      <Col s={3}>
        <Card className='large'
          header={
            <CardTitle
              image='/default-avatar-team.jpg'>
              Person Three
            </CardTitle>
          }>
          I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.
            </Card>
      </Col>
    </Row>
  )
}

export default OurTeam;
