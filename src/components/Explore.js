import React, { Component, createRef } from "react";
import ReactDOM from "react-dom";
import RoutesContainer from './RoutesContainer'
import NewRouteForm from './NewRouteForm'
import { Grid, Divider, Sticky, earch, Button, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import ExploreFilterForm from './ExploreFilterForm'


 
class Explore extends React.Component {

    constructor(){
        super();
        this.state = {
            routes: [],
            displayedRoutes: [],
            show: false,
            searchBar: ''
          }
    }


    //modal will be the new route form 
    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    
      componentDidMount(){
  
        fetch("http://localhost:3000/routes", {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.token}`
            }
          })
        .then(resp => resp.json())
        .then(data => { 
    
            console.log("this is running") 
            console.log(data)
            this.setState({ 
                routes: data,
                displayedRoutes: data 
            })
        })
      }
    
      appendNewRoute = (bikeRouteObj) => {
          this.setState({
              routes: [bikeRouteObj, ...this.state.routes ],
              displayedRoutes: [bikeRouteObj, ...this.state.routes ]
          })
      }

      handleRouteSearchFilter = (difficulty, surface ) =>{
          let newArray = this.state.routes 
          const filteredArray = newArray.filter( bikeRoute => {
            return bikeRoute.difficulty === difficulty && bikeRoute.surface === surface 
          });
          this.setState({
              displayedRoutes: filteredArray
          })
      }

      handleResetFilters = (event) => {
          this.setState({
              displayedRoutes: this.state.routes 
          })
      }


      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.handleKeyWordSearch(e.target.value) 

        console.log(e.target.value)

      };

      handleKeyWordSearch = (e) => {
        let newArray = this.state.routes 
        const filteredArray = newArray.filter( bikeRoute => {
           
          return bikeRoute.name.toLowerCase().includes(e.toLowerCase())
        });
        this.setState({
            displayedRoutes: filteredArray
        })
      }

      contextRef = createRef()


  render() {
   

    return (
        <div className="page">
            {/* <div className="page-header">
                <Grid>
                    <Grid.Column width={6}>
                        <h1>Explore Routes</h1>
                    </Grid.Column>
                    <Grid.Column width={4}>
                            <div className="ui icon input">
                            <input type="text" placeholder="Search..." name="searchBar" onChange={(event) => this.handleChange(event) } />
                            <i className="search icon"></i>
                            </div>

                    </Grid.Column>
                    <Grid.Column width={6}>
 
                    <NewRouteForm onShowModal={this.showModal} onClose={this.hideModal} style={{float: "right" }} appendNewRoute={this.appendNewRoute} />
                        
                    </Grid.Column>
                </Grid> 
            </div> */}

            <Grid stackable>
                    <Grid.Column width={3}>
                    <h1>Explore Routes</h1>
               
                            <br />
                            <div className="ui icon input">
                            <input type="text" placeholder="Search..." name="searchBar" onChange={(event) => this.handleChange(event) } />
                            <i className="search icon"></i>
                            </div>

                        <Divider />
                        <ExploreFilterForm handleRouteSearchFilter={this.handleRouteSearchFilter} handleResetFilters={this.handleResetFilters} /> 
                        <Divider />
                        <NewRouteForm onShowModal={this.showModal} onClose={this.hideModal} style={{float: "right" }} appendNewRoute={this.appendNewRoute} />
                

                    </Grid.Column>
                    <Grid.Column width={12}>
                        <div className="routes-container"> 
                            <RoutesContainer favorites={this.props.favorites} routes={this.state.displayedRoutes} userId={this.props.userId} />
                        </div>
                    </Grid.Column>
            </Grid> 

        </div>
    )
  }

}
 
export default Explore;