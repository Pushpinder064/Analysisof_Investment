import MutualFundCap from './mutualFundCap';
const LargeCapMF = () => {
    const props = {
        url : "http://localhost:3000/api/v1/mutual-fund/best-large-cap",
        
        FundCategory : "Large"
    }
    return (
        <>
            < MutualFundCap {...props} />
        </>
    )
}

// const LargeCapMF = () => {
//     const [result, setResult] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(15);
//     const navigate = useNavigate();
  
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const endpoint = "http://localhost:3000/api/v1/mutual-fund/best-large-cap"
//           const response = await axios.get(endpoint);
//             console.log(response.data)
//           if (Array.isArray(response.data)) {
//             setResult(response.data);
//           } else if (response.data && Array.isArray(response.data)) { 
//             setResult(response.data);
//           } else {
//             console.error("Unexpected API response format");
//           }
//         } catch (error) {
//           console.error("Error fetching data:", error);
//           setResult([]);
//         }
//       };
//       fetchData();
//     }, []);
  
  
//     const handleClick = (result) => {
//       navigate(`/mutual-fund/${result.scrip_cd}`, {
//         state: {
//             // TODO: have to declare variables to store values of the sciprcode and other details to be send as parameter to next page. 
//         //   scripname: result.scripname,
//         //   long_name: result.LONG_NAME,
//         //   stockID: result.scrip_cd,
//         },
//       });
//     };
  
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);
  
//     const totalPages = Math.ceil(result.length / itemsPerPage);
  
//     return (
//       <>
//         <Header />
//         <div className="market-page-hero">
//           <div className="category-selector">
//             <div className="category-selector-list">
//                 <h1>Large Cap</h1>
//               </div>
//             </div>
//           </div>
  
//           <div className="market-table">
//             <div className="table-header">
//               <div className="table-header-company">COMPANY</div>
//               <div className="table-header-price">NAV</div>
//             </div>
  
//             {currentItems.length > 0 ? (
//               currentItems.map((item, index) => (
//                 <div
//                   key={index}
//                   className="table-row"
//                   onClick={() => handleClick(item)}
//                 >
//                   <div className="table-row-company">{item.name}</div>
//                   <div className="table-row-price">
//                     <div>
//                       <h1>{`₹${item.additionalData.LTP}`}</h1>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No data available</p>
//             )}
  
//             <div className="pagination">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </button>
//               <span>{`${currentPage} of ${totalPages}`}</span>
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//       </>
//     );
//   };

export default LargeCapMF