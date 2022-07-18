import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import img from "./default.jpg"


const root = ReactDOM.createRoot(document.getElementById("root"));
const title = [
];
let l
let n
let dscr
let p = "    Link"
let p2 = "    Name"
let p3 = "    Description"
let p4 = "    price"
let products = {}
let price

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

class SearchBar extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {querry : ''}


    }
    

    Orderlst(desc){
        let ftitle = []
        if (desc === false){
            ftitle = title.reverse()
        }
        else{
            ftitle = title
        }
        let templst = []
        let thedict = {}
        let key
        let keylst = []
        let i = -0
        let I = 0
        alert(Math.ceil(ftitle.length / 3))
        while (true){
            if (i < Math.ceil(ftitle.length / 3)){
            templst.push(ftitle[I + 2])
            templst.push(ftitle[I + 1])
            templst.push(ftitle[I + 3])
            
            key = ftitle[I + 1]
            keylst.push(ftitle[I + 1])
            
            thedict[key] = templst
            alert(keylst);
            templst = []
            i++
            I += 3
            }
            else{
                break;
            }


        }
        alert(keylst.sort());
        return ftitle;
    }
    render(){
        return(
            <div>
                <div>
                    <button onClick={() => root.render(<Base/>)}>return To Base </button>
                </div>
                {this.Orderlst(true)}
            </div>
        );
    }
}

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '',value2 : '',value3 : '',value4 : ''};
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);

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
    handleChange4(event){
        this.setState({value4: event.target.value})
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

                <img src = {img} alt = "Img" width = {550} height = {300}></img>
                <div></div>
                <div></div>
                <p>Description : </p>
                <p style={{ maxWidth:600}}>{description}</p>
                <div></div>
                <a href = {link}>Get the Product</a>
                <div></div>
                <br></br>
                <button onClick={() => this.returnToBase()}>go back</button>
            </div>

        ]
    }
    
  
    handleSubmit(event) {
        
        l = this.state.value
        n = this.state.value2
        dscr = this.state.value3
        price = this.state.value4
        const len = title.length
        this.createSubsite(len,dscr,l)
        title.push(React.createElement('button', {key : title.length,onClick: () =>this.renderthis(len),description : dscr}, n))
        title.push(price)
        title.push(React.createElement('p', {key : title.length},""))
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
            <div></div>
            <input style = {{"backgroundColor":"black","color" : "white"}}type="text" value={this.state.value4} onChange={this.handleChange4} />
            {p4}
                        
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
                        <button onClick={() => root.render(<SearchBar/>)}>order itmes </button>
                        <button onClick={() => this.OC()}>add new item        </button>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
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
