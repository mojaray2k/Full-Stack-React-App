import React, { Component } from 'react';
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Jumbotron,
  Navbar,
  NavbarBrand,
  Row
} from 'reactstrap';
import Weather from './Weather';

class App extends Component {
  state = {
    weather: null,
    cityList: [],
    newCityName: ''
  };

  componentDidMount() {
    this.getCityList();
  }

  getCityList = () => {
    fetch('/api/cities')
      .then(res => res.json())
      .then(res => {
        var cityList = res.map(r => r.city_name);
        this.setState({ cityList });
      });
  };

  handleInputChange = e => {
    this.setState({ newCityName: e.target.value });
  };

  handleAddCity = () => {
    const { newCityName } = this.state;
    fetch('/api/cities', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: newCityName })
    })
      .then(res => res.json())
      .then(res => {
        this.getCityList();
        this.setState({ newCityName: '' });
      });
  };

  getWeather = (city) => {
    fetch(`/api/weather/${city}`)
    .then(res => res.json())
    .then(weather => {
      this.setState({ weather });
    });
  }

  handleChangeCity = (e) => {
    this.getWeather(e.target.value);
  }

  render() {
    const { cityList, newCityName, weather } = this.state;
    return (
      <Container fluid className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">MyWeather</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">MyWeather</h1>
              <p className="lead">
                The current weather for your favorite cities!
              </p>
              <InputGroup>
                <Input
                  placeholder="New city name..."
                  value={newCityName}
                  onChange={this.handleInputChange}
                />
                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.handleAddCity}>
                    Add City
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5">Current Weather</h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChangeCity}>
                { cityList.length === 0 && <option>No cities added yet.</option> }
                { cityList.length > 0 && <option>Select a city.</option> }
                { cityList.map((city, i) => <option key={i}>{city}</option>) }
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Weather data={weather} />
      </Container>
    );
  }
}

export default App;
