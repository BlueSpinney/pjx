import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import nAI from './default.jpg';
import logo from './logo.png'
import axios from 'axios';
import flagg from './flagg_inv.png'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set,child, get,onValue ,remove,push} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcPHKfkZVTAu3Vx0vuqNnpbZZpd2ON1yE",
  authDomain: "pjx-v2.firebaseapp.com",
  projectId: "pjx-v2",
  storageBucket: "pjx-v2.appspot.com",
  messagingSenderId: "173937287212",
  appId: "1:173937287212:web:057ace9722b389cfe23189",
  measurementId: "G-DTD62VKJQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();


let curentlen;
let mainframe = {}

let productC= {};

const getProductCount = () => {
    onValue(ref(db, 'products/'), (snapData) => {
        console.log('length : ' + Object.keys(snapData.val()).length)
        productC["keys"] = Object.keys(snapData.val())
        console.log(productC)

    })
}

let database = {}
let names = {1:"youtube"}


const getAllData = () =>{
    if (Object.keys(mainframe).length != 0){
        return null
    }
    onValue(ref(db, 'products/'), (snapData) => {
        productC["keys"] = Object.keys(snapData.val())
        console.log('getall data')
        for (let i = 0;i < productC["keys"].length ;i++){
            let curk = productC["keys"][i]
            console.log(curk)
            readdata('products/' + curk)
        }
        for (let i = 0;i < Object.keys(mainframe).length;i++){
            console.log("logged")
            let cur_element = mainframe[Object.keys(mainframe)[i]]
            database[cur_element['name']] = {"name" : cur_element['name'],"price" : cur_element['price'],"tags" : cur_element['tags'],"platform" : cur_element['platform'],"link" : cur_element['link'],"description" : cur_element['description'],"clicks" : 0,'rev' : cur_element['rev']}
            content[cur_element['name']] = {"Name" : <button class = "item" onClick={() => root.render(<Void name = {database[cur_element['name']]["name"]} name_raw = {database[cur_element['name']]['name']} description = {database[cur_element['name']]["description"]} clicks = {database[cur_element['name']]["clicks"]} tags = {database[cur_element['name']]["tags"]} price= {database[cur_element['name']]["price"]} platform = {database[cur_element['name']]["platform"]} link = {database[cur_element['name']]["link"]} reviews = {database[cur_element['name']]['rev']['rev']}/>)}><img src = {nAI} width = "80px" height= "60px"></img><br></br>{database[cur_element['name']]['name']}</button>}
        }
    })
}
getAllData()


const setrev = (productid,rev) =>{
    set(ref(db, `products/${productid}/rev`), {
        rev
    });

}

const setdata = (productid,name,price,tags,platform,link,description,clicks) =>{
    set(ref(db, 'products/' + productid), {
        id : productid,
        name: name,
        price: price,
        tags : tags,
        link : link,
        platform: platform,
        description: description,
        clicks: clicks,
        rev: {rev : ["null"]}
    });

}

const readdata = (path) =>{
    onValue(ref(db, `${path}`), (recived) => {
        mainframe[Object.keys(mainframe).length] = recived.val();
        console.log(mainframe)
    })
}
const deleteData = (p) =>{
    let target = ref(db,p)
    remove(target)
}


const root = ReactDOM.createRoot(document.getElementById('root'));


document.body.style = 'background: #23272e';
let content = {}
let render_list = []

let review;
let na;
let description;
let tags;
let price;
let platform;
let link;
let Good;

//querry
let q;
let querry_list=[];

let extxt = "Explor"

class Create extends React.PureComponent{

    hc = event => {
        na = event.target.value
    }
    hd = event =>{
        description = event.target.value
    }
    ht = event=>{
        tags = event.target.value
        tags = tags.split(",");
    }
    hp = event => {
        price = event.target.value
    }
    hpl = event => {
        platform = event.target.value
    }
    hl = event => {
        link = event.target.value
    }
    realize = (index) => {
        setdata(na,na,price,tags,platform,link,description,0)
        database[na] = {"name" : na,"price" : price,"tags" : tags,"platform" : platform,"link" : link,"description" : description,"clicks" : 0,'report' : 0,'reviews' : []}
        names[Object.keys(names).length] = na
        getProductCount()
        console.log(mainframe)
        
        
        content[na] = {"Name" : <button class = "item" onClick={() => Render_pruduct_page(Object.keys(names).lenght)}><img src = {nAI} width = "80px" height= "60px"></img><br></br>{na}</button>}
        root.render(<Base/>)

    }
    render(){
        return(
            <>  
                <div class = "plane">
                    <div>
                        <p>Name</p>
                        <input class = "inpree" type="text" onChange={this.hc}></input>
                        
                    </div>
                </div>
                <div class = "plane">
                    <div>
                        <p>Description</p>
                        <input class = "inpree" type="text" onChange={this.hd}></input>
                        
                    </div>
                </div>
                <div class = "plane">
                    <div>
                        <p>tags (separate with ",")</p>
                        <input class = "inpree" type="text" onChange={this.ht}></input>
                    </div>
                </div>
                <div class = "plane">
                    <div>
                        <p>price</p>
                        <input class = "inpree" type="text" onChange={this.hp}></input>
                        
                    </div>
                </div>
                <div class = "plane">
                    <div>
                        <p>Platform</p>
                        <input class = "inpree" type="text" onChange={this.hpl}></input>
                        
                    </div>
                </div>
                <div class = "plane">
                    <div>
                        <p>link</p>
                        <input class = "inpree" type="text" onChange={this.hl}></input>
                        
                    </div>
                </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div class = "plane">
                    <button class="creator_button" onClick={() => this.realize(na)}>Create</button>
                </div>
            </>
        );
    }
}
class SearchBar extends React.PureComponent{

    oC = event => {
        q = event.target.value
        
    }
    querry = () =>{
        querry_list = []
        let keys;
        let current_Index;
        keys = Object.keys(database)
        for (let i = 0; i < keys.length; i++){
            current_Index = database[keys[i]]
            if (current_Index["name"] === q){
                querry_list.push(content[current_Index["name"]]["Name"])
            }
        }
       
        root.render(<Base
            querry = {true}
        />)
    }

    render(){
        return(
            <>

                <input type="text" onChange={this.oC} class = "sb"></input>
                <button class = "search_button" onClick={() => this.querry()}>Search</button>
            </>
        );
    }
}

class Feedback extends React.PureComponent{
    render(){
        return(
            <>
                <div class = "plane">
                    <h1>thank you for your feedback</h1>
                </div>
                <br></br>
                <div class = "plane">
                    <p>
                        we will investigate "{this.props.name}" for more suspicius behavior
                    </p>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div class = "plane">
                    <button class = "retunr_to_main_menu_button" onClick={() => root.render(<Base/>)}>return to main menu</button>
                </div>
            </>
        );
    }
}

class ReviewForm extends React.PureComponent{
    
    rat = (good,txt) =>{
        return(
            <button class = "vote" onClick={() => Good = good}>{txt}</button>
        );

    }
    sEn = event =>{
        review = event.target.value
    }
    submit = (rev) => {
        if (Good != true && Good != false){
            alert("please select a rating")
            return
        }
        let lst = database[this.props.name]['rev']['rev']
        lst.push(rev)
        database[this.props.name]['rev'] = lst
        let curdb = database[this.props.name]

        content[this.props.name] = {"Name" : <button class = "item" onClick={() => root.render(<Void name = {curdb["name"]} name_raw = {this.props.name} description = {curdb["description"]} clicks = {curdb["clicks"]} tags = {curdb["tags"]} price= {curdb["price"]} platform = {curdb["platform"]} link = {curdb["link"]} reviews = {curdb['reviews']} />)}><img src = {nAI} width = "80px" height= "60px"></img><br></br>{this.props.name}</button>}

        //add multiple review posibilities

        setrev(this.props.name,database[this.props.name]['rev'])
        root.render(<Base/>)
    }
    render(){
        return(
            <>
                <div class = "plane">
                    <h1>{this.props.name}</h1>
                </div>
                <div class= "plane">
                    <input class = "inpree" type="text" onChange={this.sEn}></input>
                </div>
                <br></br>
                <div class = "plane">
                    <p>Please select a rating for this website</p>
                </div>
                <div class = "plane">

                    {this.rat(true,'upvote')}
                    {this.rat(false,'downvote')}

                </div>
                <br></br>
                <div class = "plane">
                    <button class = "submit_review" onClick={() => this.submit(review + " | " + Good)}>submit</button>
                </div>

            </>
        );
    }
}

class Rev extends React.PureComponent{
    render(){
        return(
            <>
                <div style={{"font-size": "150%"}} >
                    <h2>{this.props.rating}</h2>
                </div>
                <div class = "review">
                    <div>
                        <p>{this.props.rev}</p>
                    </div>
                </div>
            </>
        );
    }
}

class Void extends React.PureComponent{

    renderReviews = () =>{
        let renlst = []
        let rating = ""
        for (let i = 0;i < this.props.reviews.length;i++){
            let curentRawreview = this.props.reviews[i]
            curentRawreview = curentRawreview.split("|")
            if (curentRawreview[0] === "null"){
                continue;
            }
            if (curentRawreview[1] === " true"){
                rating = "Recomended"
            }
            else{
                rating = "Not Recomended"
            }
            renlst.push(<Rev rating = {rating} rev = {curentRawreview[0]}/>)
            renlst.push(<br></br>)
        }
        return renlst
    }
    increment_clicks = () =>{
        database[this.props.name_raw]["clicks"] += 1
        return <></>
    }

    DeleteSelf = () =>{
        console.log(database[this.props.name])
        if (database[this.props.name]['report']){
            database[this.props.name]['report'] += 1
        }
        else{
            database[this.props.name]['report'] = 1
        }
        if (database[this.props.name]['report'] > 10){
            deleteData('/products/' + this.props.name)
        }
        
        root.render(<Feedback name = {this.props.name}/>)
    }

    render(){
        return(
            <>
                {this.increment_clicks()}
                <div class = "flag">
                    <button class = "flag_button" onClick={() => this.DeleteSelf()}><img src = {flagg} width = {"100%"} height = {"100%"}></img></button>
                </div>
                <div class = "plane">
                    <h1>{this.props.name}</h1>
                </div>
                <br></br>
                <div class = "plane">
                        <img src={nAI} width= {"50%"} height = {"60%"}></img>
                </div>
                    <br></br>
                <div class= "plane">
                        <p>{this.props.description}</p>
                </div>

                <div class = "plane">
                    <h1>Details</h1>
                </div>
                <div class = "plane">
                    <p>Name : {this.props.name}</p>
                </div>
                <div class = "plane">
                    <p>Price : {this.props.price}</p>
                </div>
                <div class = "plane">
                    <p>platform : {this.props.platform}</p>
                </div>
                <div class = "plane">
                    <p>Raw link : {this.props.link}</p>
                </div>
                <br></br>
                <br></br>
                <div class = "plane">
                 <a href={this.props.link}>Shop</a>
                </div>

                <br></br>
                <br></br>
                <br></br>

                <div class = "plane">
                    <button class = "retunr_to_main_menu_button" onClick={() => root.render(<Base/>)}>return to main menue</button>
                </div>
                    <p></p>
                <div class = "plane">
                    <button class = "review_button" onClick={() => root.render(<ReviewForm name = {this.props.name}/>)}>add Review</button>
                </div>
                <br></br>
                <br></br>
                <div class = "plane"style={{"font-size": "200%"}}>
                    <h1>Reviews</h1>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div class = "plane">

                    <p>{this.renderReviews()}</p>
                </div>
            </>
        );
    }
}

const Render_pruduct_page = (name_index) =>{
    onValue(ref(db, `products/${names[1]}`), (recived) => {
        root.render(<Void name = {recived.val()["name"]} name_raw = {recived.val()["name"]} description = {recived.val()["description"]} clicks = {recived.val()["clicks"]} tags = {recived.val()["tags"]} price= {recived.val()["price"]} platform = {recived.val()["platform"]} link = {recived.val()["link"]} reviews = {[" "]} />)
    });
}


class Home extends React.PureComponent{

    Return_to_home = () =>{
        root.render(<Base/>)
    }

    render(){
        return(
            <>
                <div class = "Home">
                    <button class = "Home_button" onClick = {() => this.Return_to_home()}><img src = {logo} width = "80px" height= "60px"></img></button>
                </div>
            </>
        );

    }
}

class Sidebar extends React.PureComponent{

    OCe = () => {
        root.render(<Base tf = {!this.props.curtf}/>)
    }
    OCc = () => {
        root.render(<Create/>)
    }

    render_trends = (tf) => {
        root.render(<Trends tf = {tf}/>)
    }
    
    render(){
        if (this.props.return_after_search == null){
            return(
                <>
                    <div class = "sidebar">
                        <Home/>
                        <button class = "creator"onClick={() => this.OCc()}>Create new Product</button>
                        <button class = "explor" onClick={() => this.OCe()}>{extxt}</button>
                        <button class = "trends" onClick={() => this.render_trends(this.props.curtf)}>Trends </button>
                    </div>
                </>
            );
        }
        else if(this.props.return_after_search != null){
            return(
                <>
                    <div class = "sidebar">
                        <Home/>
                        <button class = "creator"onClick={() => this.OCc()}>Create new Product</button>
                        <button class = "explor" onClick={() => this.OCe()}>{extxt}</button>
                        <button class = "trends" onClick={() => this.render_trends(this.props.curtf)}>Trends </button>
                    </div>
                </>
            );
        }
    }
}


class Trends extends React.PureComponent{

    sort_algo = () =>{
        let key
        let k
        let new_database = {}
        let sort_list = []
        key = Object.keys(database)
        for (let i = 0; i < key.length; i++){
            k = key[i]
            while (true) {
                if (new_database[database[k]["clicks"]] != undefined){
                    database[k]["clicks"] += 1
                }else{
                    new_database[database[k]["clicks"]] = database[k]
                    break
                }
            }
            sort_list.push(database[k]["clicks"])
        }
        sort_list.sort(function(a, b){return a-b});
        sort_list.reverse();

        let renlst = []
        let render = []

        for (let i = 0;i < sort_list.length;i++){
            renlst = new_database[sort_list[i]]

            render.push(content[renlst["name"]]["Name"])
        }


        return render
    }
    
    render(){
        return(
            <>  
                <SearchBar/>
                <div class = "main_items">
                    {this.sort_algo()}
                </div>
                <Sidebar
                    curtf = {this.props.tf}
                />
            </>
        );
    }
}

class Login extends React.PureComponent{
    render(){
        return(
            <>
                <div class = "loginButtondiv">
                    <button class = "loginButton" onClick={() => root.render(<Base/>)}>Login</button>
                </div>
            </>
        );
    }
}

class Base extends React.PureComponent{

    shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;
    
        while (currentIndex !== 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
    
    renVoid = (nested_dict,random) => {
        let keys = Object.keys(nested_dict);
        extxt = "Explor"
        if (random === true){
            extxt = "Home"
            keys = this.shuffle(keys)
        }
        let leng = keys.length;
        let name = "";
        let ren = []
        render_list = []

        for (let i = 0; i < leng;i++){
            ren = []
            name = nested_dict[keys[i]]["Name"];
            
            ren = [name]
            render_list.push(ren)
        }
    }

    render(){
        if (this.props.querry !== true){
            return(
                <>
                    <SearchBar/>


                    <Sidebar
                        curtf = {this.props.tf}
                    />
                    {this.renVoid(content,this.props.tf)}
                    <div class = "main_items">
                        {render_list}
                    </div>
                </>
            );
        }
        else{
            return(
                <>
                    <SearchBar/>

                    <Sidebar
                        curtf = {this.props.tf}
                        return_after_search = "t"
                    />
                    <div class = "main_items">
                        {querry_list}
                    </div>

                </>
            );
        }
    }
    
}


root.render(<Login/>)
