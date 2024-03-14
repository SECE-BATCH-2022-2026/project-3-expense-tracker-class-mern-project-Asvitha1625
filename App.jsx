import React, { useEffect, useState } from 'react';
import './App.css';
import './indexr.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  async function fetchExpenses() {
    const response = await fetch('http://localhost:33n00/api/expenses');
    if(!response.ok){
      throw new Error('Failed to fetch expenses');
    }
    else{
      const data = await response.json();
      console.log(data)
      setExpenses(data);
    }
  }

  useEffect(() => {
    fetchExpenses();
  },[]);

  const addExpense = async(e) => {
    // if (!description || !amount) return;
  
    // const parsedAmount = parseFloat(amount);
    // const existingExpenseIndex = expenses.findIndex((expense) => expense.description === description);
  
    // if (existingExpenseIndex !== -1) {
    //   const updatedExpenses = [...expenses];
    //   updatedExpenses[existingExpenseIndex].amount += parsedAmount;
    //   setExpenses(updatedExpenses);
    // } else {
    //   const newExpense = { description, amount: parsedAmount };
    //   setExpenses([...expenses, newExpense]);
    // }
  
    // setDescription('');
    // setAmount('');
    const response = await fetch('http://localhost:3300/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description, amount })
    });
    if (!response.ok) {
      console.error('Failed to add expense');
    }
    else{
      const newExpense = await response.json();
      setExpenses([...expenses, newExpense]);
    }
  };
  
  const deleteExpense = async(index) => { 
    await fetch(`http://localhost:3300/api/expenses/${expenses[index]._id}`, 
    { 
        method: 'DELETE' 
    });
    const newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses); 
  };

  const editExpense = async(index) => {
    const newExpenses = [...expenses];
    const expense = newExpenses[index];
    setDescription(expense.description);
    setAmount(expense.amount);
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);
  };

  const totalIncome = expenses
    .filter((item) => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0);
  const totalExpense = expenses
    .filter((item) => item.amount < 0)
    .reduce((acc, item) => acc + item.amount, 0);
  const balance = totalIncome + totalExpense;


  return (
    <>
    <h1 className='heading'>Expense Tracker</h1>

    <div className="App">
      <div className="income-expense-container">
        <div className="income">
          <div className="title">Income</div>
          <div className="balance">${totalIncome.toFixed(2)}</div>
        </div>
        <div className="block"></div>
        <div className="expense">
          <div className="title">Expense</div>
          <div className="balance">${totalExpense.toFixed(2)}</div>
        </div>
        <div className="block"></div>
        <div className='total-remaining'>
          <div className="title">Total Balance</div>
          <div className="balance">${balance.toFixed(2)}</div>
        </div>
      </div>

      <form>
        <div className="input-container">
          <input
            type="text"
            placeholder="Expense Name"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Expense Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="button" onClick={addExpense}>Add Expense</button>
      </form>

      <div className="expense-item-container">
        {expenses.map((expense, index) => (
          <div
            key={index}
            className={`expense-item ${expense.amount < 0 ? 'negative' : 'positive'}`}
          >
            <div>{expense.description}</div>
            <div>${expense.amount.toFixed(2)}</div>
            <div
              className="delete-btn"
              onClick={() => deleteExpense(index)}
            >
              Delete
            </div>
            <div
              className="edit-btn"
              onClick={() => editExpense(index)}
            >
              Edit
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default App;


//==================================================================================================================================================================

// // import { useEffect, useState } from 'react'
// import './indexr.css'

// // function App() {
// //   const[count,setCount]=useState(0);
// //   const[theme,setTheme]=useState("light");
// //   const toggleTheme=()=>{
// //   if(theme=="light"){
// //     setTheme("dark");
// //   }
// //   else{
// //   setTheme("light");
// // }
// //   }
// //   return (
// //     <>
    
// //   <h1 onClick={()=> toggleTheme()}>Theme:{theme}</h1>
// //    </>
// //   )

// // }


// //=============================Array====================================
// // function App(){
// //   const[arr,setArr]=useState([0,1,2]);
// //   const addItemsToArray=()=>{
// //     let newElement=arr.length;
// //     setArr([...arr,newElement])
// //   }
// //   return(
// //     <>
// //     {
// //     arr.map((item,index)=>{
// //       return <div key={index}>{item}</div>
// // })
    
// //   <button onClick={()=> addItemsToArray()}>Click</button>
// //     </>
  
// // }
// // )

// //======================================================string=====================================================================
// // function App(){
// //   const [name,setName]=useState('');
// // return (
// //   <>
// //   <input
// //   type="text"
// //   value={name}
// //   onChange={(e)=>setName(e.target.value)}
// //   />
// //   Entered name is {name}
// //   </>
// // )
// // }
// //==================================================================object===================================================================
// // function App(){
// //   const [name,setName]=useState({fn:'',ln:''});
// // return (
// //   <>
// //   <input
// //   type="text"
// //   value={name.fn}
// //   onChange={(e)=>setName({...name,fn:e.target.value})}
// //   />
// // <br></br>
// //    <input
// //   type="text"
// //   value={name.ln}
// //   onChange={(e)=>setName({...name,ln:e.target.value})}
// //   />
// //  {name.fn && <div>firstname is {name.fn}</div>} 
// //   { /* conditional rendering*/}
// //  {name.ln && <div>lastname is {name.ln}</div>}
// //   </>
// // )
// // }

// // ===========================useEffect--hook,initial rendering,can use any times=======================================================

// // function App(){
// // const [count,setCount]=useState(0);
// // const [count2,setCount2]=useState(0);

// // useEffect(()=>{
// //   console.log("Count2 is updated")
// // },[count2])

// // useEffect(()=>{
// //   console.log("Count is updated")
// // },[])

// // useEffect(()=>{
// //   console.log("All updated")
// // })

// // return(
// //   <>
// //   <h1>Count{count}</h1>
// //   <button onClick={()=>increment()}>Count</button>
// //   <h1>Count2{count2}</h1>
// //   <button onClick={()=>increment()}>Count2</button>
// //   </>
// // )
// //}

// // const [postId, setpostId] = useState([0])
// // useEffect(()=>{
// //   async function fetchSinglePost(){
// //     let response = await fetch('https://jsonplaceholder.typicode.com/posts/${postId');
// //     let post = await Response.json();
// //     console.log(post.json())
// //   }
// //   fetchSinglePost()
// // },[postId]);
// // {post}
// // <>
// //     <input onChange = {(e)=> setpostId(e.target.value)}
// //     type="number" value={postId}></input> 
// //     </>
    
// // function App(){
// //   const[postId,setpostId] =useState(1)

// //   useEffect(()=>{
// //     async function fetchSpecificPost(){
// //     let post= await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
// //     let postObj=await response.json();
// //     console.log(postObj)
// //     }
// //     fetchSpecificPost()
// //   },[postId])

// //       return(
// //       <>
// //       <input type="number" value={postId} onChange={(e)=>{setpostId(e.target.value)}}/>
// //       </>
// //     )
// //     }

// // import {useEffect, useState} from react;


// // function App(){
// //     let expenseList = [
// //         {
// //             desc: "Food",
// //             amount: 250,
// //         },
// //         {
// //             desc: "Food",
// //             amount: 250,
// //         },
// //         {
// //             desc: "Food",
// //             amount: 250,
// //         },
// //     ]
// //  useEffect(()=>{ //empty bracket sso call one time ie., to fetch  data 1 time
// //    async function fetchExpense(){
// //         let response = await fetch('http://localhost:3000/api/get');
// //         expense = await response.json(); // store the data
// //         setExpenseList(expense); //set the expense
// //         console.log(expenseList);
// //    }

// //    let expenseAmt=0;
// //    let incomeAmt=0;

// //    expense.foreac(element=>{
// //     if(element.amount>0)
// //         {incomeAmt=incomeAmt+element.amount;}
// //     else{
// //         expenseAmt=expenseAmt+element.amount;
// //     }
// //    })
// //    fetchExpense();
// //  },[])

// // return(
// //      <>
// //         {
// //             expenseList.map((expense)=>{
// //              return(
// //                 // <div>
                
// //                 // <span className="expense-item desc">{expense.desc}:</span>
// //                 //  <span className='expense amount'>{amount}</span>
// //                 // </div>
// //                 <div className="balance">Balance:{incomeAmt+expenseAmt}</div>
// //                 <div>Income:{incomeAmt}</div>
// //             )
// //         })
// //     } </>  )
   
// // }

// // export default App;





// /////////////////////////////////////////////shanmathi///////////////////////////////////////////////////


// import { useEffect, useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import { set } from 'mongoose'

// function App() {
//   //number
//   // const [count, setCount] = useState(0)
//   // // console.log("Count",count);
//   // //const [count, setCount]=useState(1);

//   //theme
//   // const [theme,setTheme]=useState("light")
//   // const toggleTheme=()=>{
//   //   if(theme=="light"){
//   //     setTheme("dark");
//   //   }
//   //   else{
//   //     setTheme("light");
//   //   }
//   // }

//   //array
//   // const [arr,setArr]=useState([0]);
//   // const addItemtoArray=()=>{
//   //   let newElement=arr.length;
//   //   setArr([...arr,newElement])<br>
//   //   console.log("Array",arr);
//   // }

//   // //name
//   // const[name,setName]=useState({firstName:'',lastName:''});
//   // const increment=()=>{
//   //   setCount(count+1);
//   //   console.log("Count",count);
//   // }
//   // const decrement=()=>{
//   //   setCount(count-1);
//   //   console.log("Count",count);
//   // }

//   // useeffect 
//   // const [count,setCount]=useState(0);
//   // const [count2,setCount2]=useState(0);
//   // useEffect(()=>{
//   //   console.log("only at specified count");
//   // },[count2])
//   // useEffect(()=>{
//   //   console.log("only at initisal count");
//   // },[])
//   // useEffect(()=>{
//   //   console.log("All updates");
//   // })

//   // const [post,setPost]=useState(0)

//   // post
//   // const [postId,setPostId]=useState(1)
//   // useEffect(()=>{
//   //   async function fetchSinglePost(){
//   //     let response = await fetch(https://jsonplaceholder.typicode.com/posts/${postId});
//   //     let post=await response.json();
//   //     console.log(post)
//   //   }
//   //   fetchSinglePost()
//   // },[postId])
//   const[expenseList,setExpenseList]=useState([]);
//   async function fetchExpenses(){
//     let response= await fetch('http://localhost:3300/api/expenses');
//     let expense= await response.json();
//     console.log(expense);
//     setExpenseList(expense);
//   }
//   useEffect(()=>{
//     fetchExpenses();
//   },[]);
//   let expenseAmount=0;
//   let incomeAmount=7000; 

//   const [newExpense,setnewExpense]=useState({description:"",amount:0})

//   const handleSubmit=(e)=>{
//          setExpenseList(prev=>({
//             ...prev,
//             [e.target.name]:e.target.value
//          }))
//   }
//   return (
//     <>
//     <div className="balance">Balance : {incomeAmount+expenseAmount}</div>
//     <div>Income: { incomeAmount }</div>
//     <div>Expense: { expenseAmount }</div>
//     <div>
        
        
        
//         {expenseList.map((expense) => {
//                  const a = (expense.amount > 0)?"positive":"negative";
//             return (
       
//            <div className={'expense-item ' +a}> 
//             <div>{expense.description}:</div>
//            <div>${expense.amount}</div>
//            </div>)})}
           
//            </div>
// <form onSubmit={handleSubmit}>
//     <input type="text" name="description" onChange={()=>handleSubmit}></input>
//     <input type="number" name="amount" onChange={()=>handleSubmit}></input>
//     <button type='submit'>Add Expense</button>
//     </form>
//     </>
//   )
// }

// export default App

//       {/* <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
// </p> */}

// ===========================================================route=====================================================================
// import './App.css';
// import {Route,Routes} from

// function App(){
// return(
//   <>
//   <BrowseRouter>
//   <Routes>
//   <Route path="/" element={<Home/>}/>
//   <Route path="/home" element={<Home/>}/>
//   <Route path="/about" element={<About/>}/>
//   </Routes>
//   </BrowseRouter>
//   </>
// )
// }
// export default App;