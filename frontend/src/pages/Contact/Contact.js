import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Contact.css';
//import Navbar from './components/Navbar/Navbar';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_5b5pho1', 'template_s6qf4gn', form.current, 'UaqbY32JfcHBCrGdc')
      .then((result) => {
          console.log(result.text);
          alert("message sent");
          console.log("message sent");
      }, (error) => {
          console.log(error.text);
      });
  };
  
   
    
      return (
        <div className="contactForm">
        <Form ref={form} onSubmit={sendEmail}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="user_name" placeholder="Enter name" />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="user_email" placeholder="Enter email" />
          </Form.Group>
    
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your Message</Form.Label>
            <Form.Control as="textarea" rows={3} name="message"/>
          </Form.Group>
           <Button type="submit" className="btn btn-secondary buttonSend" value ="Send">Send</Button>
        </Form>
        </div>
      );
    }
 

export default Contact;