import React from 'react';
import { Row, Col, Card, CardTitle } from 'react-materialize';


const OurTeam = () => {
  return (
    <Row>
      <Col s={3}>
        <Card className='medium'
          header={
            <CardTitle
              image='https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg'>
              Person Zero
                </CardTitle>
          }>
          I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.
            </Card>
      </Col>
      <Col s={3}>
        <Card className='medium'
          header={
            <CardTitle
              image='https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg'>
              Person One
            </CardTitle>
          }>
          I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.
            </Card>
      </Col>
      <Col s={3}>
        <Card className='medium'
          header={
            <CardTitle
              image='https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg'>
              Person Two
            </CardTitle>
          }>
          I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.
            </Card>
      </Col>
      <Col s={3}>
        <Card className='medium'
          header={
            <CardTitle
              image='https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg'>
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
