import './App.css';
import { useEffect, useState } from 'react';
import AllProductTableRender from './components/allProductTableRender';

function App() {
  // Built an Expense Tracker from scratch in React. Every feature, including CRUD operations, filtering, searching, and calculations, was implemented by me without following a tutorial.

  const [productName, setProductName] = useState('')
  const [transaction, setTransaction] = useState('')
  const [category, setCategory] = useState('')
  const [transactionType, setTransactionType] = useState('')
  
  const [allProductDetails, setAllProductDetails] = useState(
    ()=>{
      try {
        return JSON.parse(localStorage.getItem('allProducts')) || []
      } catch (error) {
        console.log(error);
      }
    }
  )
  
  const [balance, setBalance] = useState('')
  const [income, setIncome] = useState('')
  const [expense, setExpense] = useState('')

  const [editIndex, setEditIndex] = useState(null)

  const [filter, setFilter] = useState({})
  const [renderingProductDetails, setRenderingProductDetails] = useState([])

  const expenseCategories = [
  "Food",
  "Groceries",
  "Transport",
  "Fuel",
  "Rent",
  "Bills",
  "Shopping",
  "Entertainment",
  "Healthcare",
  "Education",
  "Mobile & Internet",
  "Travel",
  "Gifts",
  "Other",
];

useEffect(()=>{
  // console.log(filter,filter.hasOwnProperty('transactionType'));
  // console.log(filter,filter.hasOwnProperty('category'));
  // console.log(filter,filter.hasOwnProperty('search'));
  let fitleredData = [...allProductDetails]
  if(filter.hasOwnProperty('transactionType')){
    fitleredData = fitleredData.filter((e, i)=>{
      return e.transactionType === filter.transactionType
    })
  }
  if(filter.hasOwnProperty('category')){
    fitleredData = fitleredData.filter((e, i)=>{
      return e.category === filter.category
    })
  }
  if(filter.hasOwnProperty('search')){
    fitleredData = fitleredData.filter((e, i)=>{
      return e.productName.includes(filter.search)
    })
  }
  if(filter.hasOwnProperty('sort')){
    if(filter.sort === 'lowToHigh'){
      fitleredData = fitleredData.sort((a,b)=> a.transaction-b.transaction)
    }
    if(filter.sort === 'highToLow'){
      fitleredData = fitleredData.sort((a,b)=> b.transaction-a.transaction)
    }
    if(filter.sort === 'aToZ'){
      // a-b>= 1 swap
      // a-b<= -1 no swap
      fitleredData = fitleredData.sort((a,b)=> a.productName>b.productName ? 1 : -1)
    }
    if(filter.sort === 'zToA'){
      fitleredData = fitleredData.sort((a,b)=> b.productName>a.productName ? 1 : -1)
    }
    // highToLow
   console.log(filter);
    
  }

  setRenderingProductDetails(fitleredData)

}, [filter, allProductDetails])

useEffect(()=>{
  let income = 0
  let expense = 0

  allProductDetails.forEach((e, i)=>{
    if(e.transactionType === 'income'){
      income += Number(e.transaction)
    }
    if(e.transactionType === 'expense'){
      expense += Number(e.transaction)
    }
  })

  let balance = allProductDetails.reduce((acc, curr)=>{
    if(curr.transactionType === 'expense'){
      return acc - Number(curr.transaction)
    }else{ 
      return acc + Number(curr.transaction)
    }
  }, 0)

  setIncome(income)
  setExpense(expense)
  setBalance(balance)

  localStorage.setItem('allProducts',JSON.stringify(allProductDetails))
}, [allProductDetails])

const getData = (e) =>{
  e.preventDefault()  
  if(editIndex === null){
    setAllProductDetails(prev=> [...prev, {productName, transaction, category, transactionType}])
  }
  else{
    setAllProductDetails(
      allProductDetails.map((e, i)=>{
        if(i === Number(editIndex)){
          return {productName, transaction, category, transactionType}
        }
        return e
      })
    )
  }

  setProductName('')
  setTransaction('')
  setCategory('')
  setTransactionType('')
  setEditIndex(null)
}

const del = (index) =>{
  setAllProductDetails(
    allProductDetails.filter((e, i)=>{
      return index !== i
    })
  )
}

const edit = (index) =>{
  setProductName(allProductDetails[index].productName)
  setTransaction(allProductDetails[index].transaction)
  setCategory(allProductDetails[index].category)
  setTransactionType(allProductDetails[index].transactionType)

  setEditIndex(index)
}

  return (
    <div className="App">

      <header>
        <h1>Expense Tracker App</h1>
      </header>

      <main>

    <section>
        <div>Total Loss: <div>{balance < 0 ? balance : 0}</div> </div>
        <div>Total Profit: <div>{balance > 0 ? balance : 0}</div> </div>
        <div>Total Income: <div>{income}</div> </div>
        <div>Total Expense: <div>{expense}</div> </div>
      </section>

      <section>
        <form onSubmit={(e)=>{
          if(productName.trim() !== ''&& transaction.trim() !== ''){
            getData(e)
          }
        }}>
          <div>
          <input type="text" value={productName} minLength={'1'} required placeholder='Enter the Product name' onChange={e=> setProductName(e.target.value)}/>
        </div>
        <div>
          <input type="number" min={'1'} value={transaction} required placeholder='Enter the Amount' onChange={e=> setTransaction(e.target.value)}/>
        </div>
        <div>
          <select name="categories" id="categories" value={category} required onChange={e=> setCategory(e.target.value)}>
            <option value="" disabled>Select Category</option>
            {
              expenseCategories.map((e, i)=>{
                return <option value={e.slice(0,1).toLowerCase() + e.slice(1)} key={i}>{e}</option>
              })
            }
          </select>
        </div>
        <div>
          <select name="" id="" value={transactionType} required onChange={e=> setTransactionType(e.target.value)}>
            <option value="" disabled>Select Transaction Type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div><button>Submit</button></div>
        </form>
      </section>

      <section>
        <div>
          <div><input type="search" onChange={e=>{
            let obj = {...filter}
              obj.search = e.target.value
              setFilter(obj)
          }} name="" id="" placeholder='Search'/></div>
        </div>
        <div>
          <select name="" id="" defaultValue={''} onChange={e=>{
            let obj = {...filter}
              obj.transactionType = e.target.value
              setFilter(obj)
          }}>
            <option value="" disabled>All</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div>
          <div>
            <select name="categories" id="categories" defaultValue={''} onChange={e=>{ 
              let obj = {...filter}
              obj.category = e.target.value
              setFilter(obj)
            }}>
            <option value="" disabled>Select Category</option>
            {
              expenseCategories.map((e, i)=>{
                return <option value={e.slice(0,1).toLowerCase() + e.slice(1)} key={i}>{e}</option>
              })
            }
          </select>
          </div>
          <div>
            <select
  defaultValue=""
  onChange={(e) => {
    setFilter((prev) => ({
      ...prev,
      sort: e.target.value,
    }));
  }}
>
  <option value="" disabled>
    Select Sort
  </option>
  <option value="lowToHigh">Amount: Low to High</option>
  <option value="highToLow">Amount: High to Low</option>
  <option value="aToZ">Name: A to Z</option>
  <option value="zToA">Name: Z to A</option>
</select>
          </div>
        </div>
        <div>
          {renderingProductDetails.map((e, i)=>{
          return <AllProductTableRender e={e} key={i} edit={edit} del={del} index={i}/>
        })}
        </div>
      </section>

      </main>

    </div>
  );
}

export default App;