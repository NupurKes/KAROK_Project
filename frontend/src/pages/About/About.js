import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./About.css";
import "../../App.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import image1 from "../../img/img1.png";
import image2 from "../../img/Niloo.png";
import image3 from "../../img/img3.png";
import lucieImage from "../../img/lucie.png"

const About = () => {
  return (
    <>
    <Container >
    <div className ='team'>
    <div><h1 className='pageTitle Webname'>OUR AMAZING TEAM</h1></div>
    
    </div>
    <Row>
  <div className='about'>
  <Col>  
    <Card  style={{ width: '15rem' }}>
    
    <Card.Body className ="cardBody">
    <img className='roundedImage' src={image3} alt="" />
    
    
      <Card.Title className='title'><b>Nupur Kesarwani</b><br/>
      Software Developer
      </Card.Title>

            <Card.Text className="textCard">
              John Abbott College Student in Montreal. Right Now we all work on
              Karokify application.
            </Card.Text>
            <Button variant="info" className="button">
              Contact
            </Button>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style={{ width: "15rem" }}>
          <Card.Body>
            <img className="roundedImage" src={image2} alt="" />
            <Card.Title className="title">
              <b>Niloofar Keshavarz</b>
              <br />
              Software Developer
            </Card.Title>
            <Card.Text className="textCard">
              John Abbott College Student in Montreal. Right Now we all work on
              Karokify application.
            </Card.Text>
            <Button variant="info" className="button">
              Contact
            </Button>
          </Card.Body>
        </Card>
        </Col>
        <Col>

        <Card style={{ width: "15rem" }}>
          <Card.Body>
            <img className="roundedImage" src={image1} alt="" />
            <Card.Title className="title">
              <b>Jingyu An</b>
              <br />
              Software Developer
            </Card.Title>
            <Card.Text className="textCard">
              John Abbott College Student in Montreal. Right Now we all work on
              Karokify application.
            </Card.Text>
            <Button variant="info" className="button">
              Contact
            </Button>
          </Card.Body>
        </Card>
        </Col>
        <Col>

        <Card style={{ width: "15rem" }}>
          <Card.Body>
            <img className='roundedImage' src={lucieImage} alt="" />

            <Card.Title className="title">
              <b>Hyunju Roh</b>
              <br />
              Software Developer
            </Card.Title>
            <Card.Text className="textCard">
              John Abbott College Student in Montreal. Right Now we all work on
              Karokify application.
            </Card.Text>
            <Button variant="info" className="button">
              Contact
            </Button>
          </Card.Body>
        </Card>
        </Col>
      </div>
      </Row>
      </Container>
    </>
  );
};

export default About;
