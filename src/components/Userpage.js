import React from 'react'
import { Button, ListGroup, ListGroupItem, Grid, Row, Col, Image } from 'react-bootstrap'
import userService from '../services/userService'
import beerService from '../services/beerService'
import reviewService from '../services/reviewService';

class Userpage extends React.Component {
    constructor() {
        super()
        this.state = {
            user: null,
            //beers: [],
            //reviews: []
        }
    }

    // willMount wont re-render with async calls
    componentDidMount = async () => {
        console.log(this.props.userId)
        const thisUser = await userService.getOne(this.props.userId)
        this.setState({
            user: thisUser
        })
    }

    render() {
        // gives time for getUser
        if (this.state.user === null) {
            return (
                <div></div>
            )
        }

        return (
            <div className='userpage'>
                <p>welcome to userpage</p>
                <h1>{this.state.user.username}</h1>
                <Grid>
                    <Row className='userinfo'>
                        <Col sm={6} md={3}> 
                        <Image src="http://www.uniforst.fi/wp-content/uploads/2016/05/IMGP8505.jpg" responsive />;
                        </Col>
                        <Col sm={6} md={3}>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                            Donec hendrerit tempor tellus. Donec pretium posuere tellus.
                            Proin quam nisl, tincidunt et, mattis eget, convallis nec,
                             purus. Cum sociis natoque penatibus et magnis dis parturient
                              montes, nascetur ridiculus mus. Nulla posuere.</p>
                        </Col>
                    </Row>
                </Grid>
                <h3>Reviews</h3>
            </div>
        )
    }
}
// https://goo.gl/images/r7xYLY
export default Userpage