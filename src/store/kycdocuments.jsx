import User from "/images/avatar/b-sm.jpg";
import User2 from "/images/avatar/c-sm.jpg";
import User3 from "/images/avatar/a-sm.jpg";
import User4 from "/images/avatar/d-sm.jpg";

export const kycDocuments = [
  {
    id:"UD01544",
    username:"Abu Bin Ishtiyak",
    avatar:{
        image:"",
        initials:"AB",
        theme:"primary"
    },
    docType:"Passport", 
    documents: ["Front side", "Back side"],
    submitted:"18 Dec, 2019 01:02", 
    status:"approved", 
    checkedBy: {
        name: "Janet Snyder",  
        initials: "JS" 
    }
},
{
    id:"UD01489",
    username:"Amelia Grant",
    avatar:{
        image:User,
        initials:"AG",
        theme:"primary"
    },
    docType:"National ID", 
    documents: ["Front side", "Back side"], 
    submitted:"12 Jan, 2020 01:02 PM", 
    status:"approved", 
    checkedBy: {
        name: "Ernesto Vargas",  
        initials: "EV" 
    }
},
{
    id:"UD01434",
    username:"Kristen Hawkins",
    avatar:{
        image:User2,
        initials:"KH",
        theme:"primary"
    },
    docType:"Passport", 
    documents: ["Front side", "Back side"], 
    submitted:"12 Jan, 2020 01:02 PM", 
    status:"approved", 
    checkedBy: {
        name: "Ernesto Vargas",  
        initials: "EV" 
    }
},
{
    id:"UD01286",
    username:"Tommy Vasquez",
    avatar:{
        image:"",
        initials:"TV",
        theme:"primary"
        },
    docType:"Driving ID", 
    documents: ["Front side"], 
    submitted:"12 Jan, 2020 01:02 PM", 
    status:"pending", 
    checkedBy: {
        name: "Ernesto Vargas",  
        initials: "EV" 
    }
},
{
    id:"UD01235",
    username:"Alejandro Haynes",
    avatar:{
        image:"",
        initials:"AH" ,
        theme:"yellow"
        },
    docType:"Passport", 
    documents: ["Front side", "Back side"],  
    submitted:"18 Dec, 2019 01:02 PM", 
    status:"approved", 
    checkedBy: {
        name: "Janet Snyder",  
        initials: "JS" 
    }
},
{
    id:"UD01223",
    username:"Brooke Harmon",
    avatar:{
        image:User3,
        initials:"BH",
        theme:"primary"
        },
    docType:"Passport", 
    documents: ["Front side", "Back side"],  
    submitted:"18 Dec, 2019 01:02 PM", 
    status:"rejected", 
    checkedBy: {
        name: "Janet Snyder",  
        initials: "JS" 
    }
},
{
    id:"UD01124",
    username:"Trevor Miller",
    avatar:{
        image:User4,
        initials:"TM",
        theme:"primary"
        },
    docType:"Passport", 
    documents: ["Front side", "Back side"],  
    submitted:"18 Dec, 2019 01:02 PM", 
    status:"approved", 
    checkedBy: {
        name: "Janet Snyder",  
        initials: "JS" 
    }
},
{
    id:"UD01120",
    username:"Lonnie Ferguson",
    avatar:{
        image:User3,
        initials:"LF",
        theme:"primary"
        },
    docType:"Driving ID", 
    documents: ["Front side"],  
    submitted:"18 Dec, 2019 01:02 PM", 
    status:"pending", 
    checkedBy: {
        name: "Janet Snyder",  
        initials: "JS" 
    }
},
{
    id:"UD00954",
    username:"Mack Kennedy",
    avatar:{
        image:"",
        initials:"LF",
        theme:"green"
        },
    docType:"Passport", 
    documents: ["Front side", "Back side"],  
    submitted:"18 Dec, 2019 01:02 PM", 
    status:"approved", 
    checkedBy: {
        name: "Janet Snyder",  
        initials: "JS" 
    }
},
{
    id:"UD00472",
    username:"Inez Wilkerson",
    avatar:{
        image:"",
        initials:"IW",
        theme:"primary"
        },
    docType:"Passport", 
    documents: ["Front side", "Back side"],  
    submitted:"18 Dec, 2019 01:02 PM", 
    status:"rejected", 
    checkedBy: {
        name: "Janet Snyder",  
        initials: "JS" 
    }
}
];
