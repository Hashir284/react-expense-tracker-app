import React from 'react'

const AllProductTableRender = ({e, edit, del, index}) => {
  const isExpense = e.transactionType === 'expense';
    
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 bg-slate-900/40 hover:bg-slate-950/40 transition duration-150 text-center sm:text-left">
      
      {/* 1. Item Name (Centered on Mobile, Left on Desktop for readability, or you can keep it centered too) */}
      <div className="flex-1 min-w-0 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3">
        <span className="font-semibold text-white text-base sm:text-lg tracking-normal break-words overflow-hidden text-center sm:text-left">
          {e.productName}
        </span>
        
        {/* Mobile-Only Type Badge */}
        <span className={`sm:hidden text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded ${
          isExpense ? 'bg-rose-500/10 text-rose-400 border border-rose-500/10' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10'
        }`}>
          {e.transactionType}
        </span>
      </div>

      {/* Right side container - aligned perfectly in center */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 justify-center sm:justify-end shrink-0">
        
        {/* 2. Category & Flow Tag (Perfectly Centered) */}
        <div className="flex items-center justify-center gap-2.5 sm:w-48 sm:justify-center flex-wrap">
          <span className="text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg capitalize">
            {e.category || 'General'}
          </span>
          
          {/* Desktop-Only Flow Badge */}
          <span className={`hidden sm:inline text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded ${
            isExpense ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
          }`}>
            {e.transactionType}
          </span>
        </div>

        {/* 3. Value/Amount (Centered text display) */}
        <div className="font-bold text-base sm:text-lg sm:w-32 text-center whitespace-nowrap">
          <span className={isExpense ? 'text-rose-400' : 'text-emerald-400'}>
            {isExpense ? '- ' : '+ '}Rs. {e.transaction}
          </span>
        </div>

        {/* 4. Action Buttons (Centered & spaced correctly) */}
        <div className="flex justify-center gap-2.5 sm:w-40 shrink-0">
          <button 
            onClick={()=>{ edit(index) }}
            className="flex-1 sm:flex-none text-xs sm:text-sm font-bold text-blue-400 hover:text-white hover:bg-blue-600 border border-blue-500/30 px-4 py-2 rounded-lg transition"
          >
            Edit
          </button>
          <button 
            onClick={()=>{ del(index) }}
            className="flex-1 sm:flex-none text-xs sm:text-sm font-bold text-rose-400 hover:text-white hover:bg-rose-600 border border-rose-500/30 px-4 py-2 rounded-lg transition"
          >
            Delete
          </button>
        </div>

      </div>

    </div>
  )
}

export default AllProductTableRender;