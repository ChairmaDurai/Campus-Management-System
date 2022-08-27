import { useEffect, useState } from "react";



const  Tasks = () => {
  const array = [1, 3, 5, 3, 7, 1, 4, 3]
  const [data, setData] = useState([])
  const [others, setOthers] = useState([])
  useEffect(() => {
    const unique = array.filter((ele, ind, arr) => {
      return arr.indexOf(ele) === ind
    })
    const thirdLarget = unique.sort((a, b)=>{
        return b - a
    })
    setData(unique)
    setOthers(thirdLarget[2])
    
  },[])
  return (
    <>
      <div>
        <h4>Unique Element of array [1, 3, 5, 3, 7, 1, 4, 3]</h4>
        {data.map((item) => {
          return (
            <span key={item}>
              <span >{item}</span>
            </span>)
        })}
      </div>
      <div>
        <h4>Thrid Largest Element in array [1, 3, 5, 3, 7, 1, 4, 3]</h4>
        {others}
      </div>
    </>
  );
}

export default Tasks;
