import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
const title = [
];
let l
let n
let p = "    Link"
let p2 = "    Name"
let state = false

document.body.style = 'background: black;';


class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '',value2 : ''};
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }
  
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleChange2(event) {
        this.setState({value2: event.target.value});
    }
  
    handleSubmit(event) {
        
        l = this.state.value
        n = this.state.value2
        
        title.push(React.createElement('a', {key : title.length,href : l}, n))
        title.push(React.createElement('div', {key : title.length}))
        event.preventDefault();
        state = !state
        root.render(<Base/>)
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label style={{"color" : "white","fontFamily": "Arial, Helvetica, sans-serif"}}>
            <input style = {{"backgroundColor":"black","color" : "white"}}type="text" value={this.state.value} onChange={this.handleChange} />
            {p}
            <div></div>
            <input style = {{"backgroundColor":"black","color" : "white"}}type="text" value={this.state.value2} onChange={this.handleChange2} />
            {p2}
          </label>
          <div></div>
          <input type="submit" value="Create" style = {{"width":"101px","backgroundColor" : "rgb(30, 30, 30)","color" : "white","borderColor" : "rgb(0, 195, 255)" }}/>
        </form>
      );
    }
  }


class Base extends React.Component{
    OC = () => {
        state = !state
        root.render(<Base/>)
    }

    render() {
        if (state === false){
            return(
                <div>
                    <div>
                        <button onClick={() => this.OC()}>add new link</button>
                    </div>
                    <div>
                        <p>    </p>
                    </div>
                    <div>
                        {title}
                    </div>
                </div>
            );
        }
        else{
            return (
                <div>
                    <div>
                        {<NameForm/>}
                    </div>

                </div>
            );
        }
    }
}


root.render(<Base />);
