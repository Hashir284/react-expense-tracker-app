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
  let fitleredData = [...allProductDetails]
  
  if(filter.hasOwnProperty('transactionType')){
    fitleredData = fitleredData.filter((e, i)=>{
      if(filter.transactionType == 'all'){
        return e.transactionType
      } 
      return e.transactionType === filter.transactionType
    })
  }
  if(filter.hasOwnProperty('category')){
    fitleredData = fitleredData.filter((e, i)=>{
      if(filter.category == 'all'){
        return e.category
      } 
      console.log('e',e);
      console.log(e.category);
      
      return e.category === filter.category
    })
  }
  if(filter.hasOwnProperty('search')){
    fitleredData = fitleredData.filter((e, i)=>{
      return e.productName.toLowerCase().includes(filter.search.toLowerCase())
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
      fitleredData = fitleredData.sort((a,b)=> a.productName.toLowerCase() > b.productName.toLowerCase() ? 1 : -1)
    }
    if(filter.sort === 'zToA'){
      fitleredData = fitleredData.sort((a,b)=> b.productName.toLowerCase() > a.productName.toLowerCase() ? 1 : -1)
    }
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
    <div className="App min-h-screen bg-slate-950 text-slate-100 pb-20 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Clean Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 py-5 px-4 sm:px-6">
        <div className="max-w-6xl sm:items-start sm:justify-center mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className=''>
            <h1 className="text-xl sm:text-2xl text-center font-bold text-white tracking-tight">FinTrack Pro</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Professional Ledger & Capital Management</p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-slate-800/80 border border-slate-700 px-3.5 py-1.5 rounded-lg text-slate-300 font-semibold tracking-wide">
            <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
            LEDGER SYNCED
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 space-y-10">

        {/* Clean, Simple, Bold Metric Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Loss</span>
            <div className="text-2xl sm:text-3xl font-bold text-rose-500 mt-2 tracking-tight">
              {balance < 0 ? `Rs. ${Math.abs(balance)}` : 'Rs. 0'}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Profit</span>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-2 tracking-tight">
              {balance > 0 ? `Rs. ${balance}` : 'Rs. 0'}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Income</span>
            <div className="text-2xl sm:text-3xl font-bold text-blue-400 mt-2 tracking-tight">
              Rs. {income}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Expense</span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-300 mt-2 tracking-tight">
              Rs. {expense}
            </div>
          </div>
        </section>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 lg:gap-0 lg:gap-y-9 xl:gap-8 gap-8 justify-items-center items-start">
          
          {/* Professional Form Widget */}
          <section className="lg:col-span-4 w-full lg:max-w-[820px] bg-slate-900 xl:px-6 border border-slate-800 p-6 sm:p-7 rounded-xl shadow-md">
            <h2 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
              <span className="h-2.5 w-2.5 bg-blue-500 rounded-full"></span>
              {editIndex !== null ? 'Edit Transaction Details' : 'Record New Transaction'}
            </h2>
            
            <form onSubmit={(e)=>{
              if(productName.trim() !== '' && transaction.trim() !== ''){
                getData(e)
              }
            }} className="space-y-5">
              <div>
                <label className="block pl-1 text-left sm:text-sm font-semibold text-slate-300 mb-2">Item / Service Name</label>
                <input 
                  type="text" 
                  value={productName} 
                  minLength={'1'} 
                  required 
                  placeholder='e.g. Office Rent, Cloud Server' 
                  onChange={e=> setProductName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base text-white placeholder:text-slate-600 transition"
                />
              </div>
              
              <div>
                <label className="block pl-1 text-left  sm:text-sm font-semibold text-slate-300 mb-2">Amount (PKR)</label>
                <input 
                  type="number" 
                  min={'1'} 
                  value={transaction} 
                  required 
                  placeholder='0.00' 
                  onChange={e=> setTransaction(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base text-white placeholder:text-slate-600 transition"
                />
              </div>

              <div>
                <label className="block pl-1 text-left  sm:text-sm font-semibold text-slate-300 mb-2">Category Tag</label>
                <select 
                defaultValue={''} 
                  name="categories" 
                  id="categories" 
                  value={category} 
                  required 
                  onChange={e=> setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base text-slate-300 cursor-pointer transition"
                >
                  <option value="" disabled className="text-slate-600">Choose Category</option>
                  {
                    expenseCategories.map((e, i)=>{
                      return <option value={e.slice(0,1).toLowerCase() + e.slice(1)} key={i} className="bg-slate-950 text-white">{e}</option>
                    })
                  }
                </select>
              </div>

              <div>
                <label className="block pl-1 text-left  sm:text-sm font-semibold text-slate-300 mb-2">Transaction Direction</label>
                <select
                defaultValue={''} 
                  name="" 
                  id="" 
                  value={transactionType} 
                  required 
                  onChange={e=> setTransactionType(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base text-slate-300 cursor-pointer transition"
                >
                  <option value="" disabled className="text-slate-600">Select Direction</option>
                  <option value="expense" className="text-rose-400 bg-slate-950">Expense (Debit)</option>
                  <option value="income" className="text-emerald-400 bg-slate-950">Income (Credit)</option>
                </select>
              </div>

              <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-sm transition duration-150 text-sm sm:text-base active:scale-[0.99] mt-3">
                {editIndex !== null ? 'Save Changes' : 'Post Transaction'}
              </button>
            </form>
          </section>

          {/* Database Grid Section */}
          <section className="lg:col-span-8 space-y-5">
            
            {/* Highly Intuitive Filtering Header */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shadow-sm">
              <input 
                type="search" 
                onChange={e=>{
                  let obj = {...filter}
                  obj.search = e.target.value
                  setFilter(obj)
                }} 
                placeholder='🔍 Search records...'
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition"
              />
              <select 
                defaultValue={'all'} 
                onChange={e=>{
                  let obj = {...filter}
                  obj.transactionType = e.target.value
                  setFilter(obj)
                }}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer transition"
              >
                <option value="all">All Transactions</option>
                <option value="expense">Expense Only</option>
                <option value="income">Income Only</option>
              </select>
              <select 
                name="categories" 
                id="categories" 
                defaultValue={'all'} 
                onChange={e=>{ 
                  let obj = {...filter}
                  obj.category = e.target.value
                  setFilter(obj)
                }}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer transition"
              >
                <option value="all">All Categories</option>
                {
                  expenseCategories.map((e, i)=>{
                    return <option value={e.slice(0,1).toLowerCase() + e.slice(1)} key={i}>{e}</option>
                  })
                }
              </select>
              <select
                defaultValue=""
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    sort: e.target.value,
                  }));
                }}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer transition"
              >
                <option value="">Sort Ledger</option>
                <option value="lowToHigh">Value: Low to High</option>
                <option value="highToLow">Value: High to Low</option>
                <option value="aToZ">Name: A to Z</option>
                <option value="zToA">Name: Z to A</option>
              </select>
            </div>

            {/* Clean Table Grid Container */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
              {/* Header Titles */}
            {/* Replace your Table Header div with this inside App.js */}
{/* Replace your Table Header div with this inside App.js */}
<div className="hidden sm:flex justify-between items-center gap-4 px-6 py-4.5 bg-slate-950 text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
  {/* Name Header */}
  <div className="flex-1 text-left py-5">Record / Item</div>
  
  {/* Right Side Headers (Matched with row centers) */}
  <div className="flex items-center gap-8 shrink-0">
    <div className="w-48 text-center">Category</div>
    <div className="w-32 text-center">Value (PKR)</div>
    <div className="w-40 text-center">Actions</div>
  </div>
</div>

              {/* Rows render */}
              <div className="divide-y divide-slate-800/80">
                {renderingProductDetails.map((e, i)=>{
                  return <AllProductTableRender e={e} key={i} edit={edit} del={del} index={i}/>
                })}
                {renderingProductDetails.length === 0 && (
                  <div className="p-16 text-center text-slate-500 text-sm sm:text-base font-semibold">
                    No matching ledger transactions found.
                  </div>
                )}
              </div>
            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default App;