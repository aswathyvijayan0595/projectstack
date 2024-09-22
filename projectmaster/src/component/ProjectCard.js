import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../service/baseurl';
import { Link } from 'react-router-dom';


function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Card onClick={handleShow} style={{ width: '13rem' }}>
                <Card.Img style={{ width: '100%' }} variant="top" src={`${BASE_URL}/uploads/${project.proImg}`} />
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                </Card.Body>
            </Card>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{project.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col>
                                <img style={{width:'100%'}} src={`${BASE_URL}/uploads/${project.proImg}`} alt="" />
                           <h4>Technologies :</h4>
                           <p className='text-center'>html,css,js</p>
                            </Col>
                            <Col>
                                <h4>Description</h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusamus asperiores laboriosam? Quia assumenda, veniam impedit maxime iure illum autem harum maiores eius provident, consectetur officia, accusantium consequuntur nemo optio.
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
             <div>
                    <Link to={project.website}><i class="fa-solid fa-link fa-xl me-2" style={{color:' #000000'}}></i></Link>
                    <Link to={project.github}><i class="fa-brands fa-github fa-xl" style={{color:' #000000'}}></i></Link>
             </div>

                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ProjectCard