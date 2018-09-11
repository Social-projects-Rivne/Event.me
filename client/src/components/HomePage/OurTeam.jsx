import React from 'react';
import { Row, Col, Card, CardTitle } from 'react-materialize';


const OurTeam = () => {
  return (
    <Row>
      <Col s={3}>
        <Card className='large'
          header={
            <CardTitle
              image='/img/team/andre.jpg'>
              Andrew Black
                </CardTitle>
          }>
          As the leader of Squarespace’s Strategy division, Andrew is responsible for 
          developing the analytical frameworks that shape the company’s business.
            </Card>
      </Col>
      <Col s={3}>
        <Card className='large'
          header={
            <CardTitle
              image='/img/team/artem.jpeg'>
              Artem Korniychuk
            </CardTitle>
          }>
          Artem Korniychuk, SVP of Engineering, oversees Squarespace’s vast engineering organization 
          which drives the core programming for the company.
            </Card>
      </Col>
      <Col s={3}>
        <Card className='large'
          header={
            <CardTitle
              image='/img/team/yura.jpeg'>
              Yruii Asstelite
            </CardTitle>
          }>
          Yruii Asstelite leads Squarespace Ireland and oversees the company’s global Customer Operations 
          teams that support millions of Squarespace users.
            </Card>
      </Col>
      <Col s={3}>
        <Card className='large'
          header={
            <CardTitle
              image='/img/team/YaZhyvyi.jpg'>
              Undead
            </CardTitle>
          }>
          Undead leads the company’s award-winning creative team, whose work encapsulates 
          all brand creative, web design, and product design efforts for the company.
            </Card>
      </Col>
    </Row>
  )
}

export default OurTeam;
