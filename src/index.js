import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
const title = [
];
let l
let n
let dscr
let p = "    Link"
let p2 = "    Name"
let p3 = "    Description"
let products = {}

let state = false

document.body.style = 'background: black;';
class InaneCarinae extends React.PureComponent {
    render() {
        return (
            <div>
                {products[this.props.id]}
            </div>
        );
    }
}


class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '',value2 : '',value3 : ''};
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);

    }
  
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleChange2(event) {
        this.setState({value2: event.target.value});
    }
    handleChange3(event) {
        this.setState({value3: event.target.value})
    }

    renderthis = (id) => {
        root.render(<InaneCarinae id = {id}/>)
    }

    returnToBase = () => {
        root.render(<Base/>)
    }

    createSubsite = (key,description,link) => {
        products[key] = [
            <div>
                <p>picture goes here</p>
                <div></div>
                <div></div>
                <p>description</p>
                <p>{description}</p>
                <div></div>
                <a href = {link}>get the product</a>
                <div></div>
                <button onClick={() => this.returnToBase()}>go back</button>
            </div>

        ]
    }
    
  
    handleSubmit(event) {
        
        l = this.state.value
        n = this.state.value2
        dscr = this.state.value3
        const len = title.length
        this.createSubsite(len,dscr,l)
        title.push(React.createElement('button', {key : title.length,onClick: () =>this.renderthis(len),description : dscr}, n))
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
            <div></div>
            <input style = {{"backgroundColor":"black","color" : "white"}}type="text" value={this.state.value3} onChange={this.handleChange3} />
            {p3}
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
