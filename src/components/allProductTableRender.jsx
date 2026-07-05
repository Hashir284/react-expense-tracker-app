import React from 'react'

const AllProductTableRender = ({e, edit, del, index}) => {
    
  return (
      <div>
          <div>
            {e.productName}
          </div>
          <div>
            {e.transaction}
          </div>
          <div>
            <button onClick={()=>{
                edit(index)
            }}>Edit</button>
          </div>
          <div>
            <button onClick={()=>{
                del(index)
            }}>Delete</button>
          </div>
        </div>
  )
}

export default AllProductTableRender
