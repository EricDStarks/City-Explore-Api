import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from 'axios';
import { useState } from 'react';



function FindCity() {
    // const [find, setFind] = useState()
    // const [place, setPlace] = useState({})
    // const [image, setImage] = useState()
    var userInput = ""
    let key = "pk.1d13b86de8bd81abf5284388a4607024"
    const [cityData, setCityData] = useState({
        
        // "display_name": "San Diego, San Diego County, California, USA",
        // "lat": "32.7174202",
        // "lon": "-117.1627728"
    })


    return (
        <div className="Explore">
            {/* <Form> */}
            <Form.Group>
                <Form.Label className="label">Name of City</Form.Label>
                <Form.Control onChange={function (event) {

                    userInput = event.target.value
                }} type="text" placeholder="Enter City Name" />
                <Button onClick={function (event) {
                    let url = `https://us1.locationiq.com/v1/search?key=${key}&q=${userInput}&format=json`
                    
                    let map = `https://maps.locationiq.com/v3/staticmap`

                    var response = axios.get(url)
                    response.then(function (res) {
                        console.log(res.data[0])
                        setCityData(res.data[0])
                    })


                    //make API call to LocationIQ for geographic coordinates

                }} variant="primary" type="submit">Find</Button>
            </Form.Group>
            {/* </Form> */}
            <Card>
                <Card.Body>
                    <Card.Title>{cityData.display_name}</Card.Title>
                    <Card.Text>{cityData.lat}</Card.Text>
                    <Card.Text>{cityData.lon}</Card.Text>
                    <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${key}&center=${cityData.lat},${cityData.lon}&zoom=11`}></Card.Img>
                </Card.Body>
            </Card>
        </div>
    )
}

export default FindCity