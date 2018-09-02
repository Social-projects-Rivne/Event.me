import React from 'react';
import { Row, Col, Card, CardTitle } from 'react-materialize';


const HowAddEvent = () => {
  return (
    <Row>
      <Col s={4}>
        <Card horizontal header={
          <CardTitle
            image="/img/register.jpg" />
        }>
          <p>The first thing you need to do is register in our system.
                 You can do this at the top of this page.</p>
        </Card>
      </Col>
      <Col s={4}>
        <Card horizontal header={
          <CardTitle
            image="/img/form.jpg" />
        }>
          <p>When you sign in, press the red button at the bottom of the window and fill the
                 form.</p>
        </Card>
      </Col>
      <Col s={4}>
        <Card horizontal header={
          <CardTitle
            image="/img/review.jpg" />
        }>
          <p>That's all. Now you must wait some time for review by the moderator to approve
                your event.</p>
        </Card>
      </Col>
    </Row>
  )
}

export default HowAddEvent;
