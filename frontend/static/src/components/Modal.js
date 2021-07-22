import React, { Component } from "react";

class Modal extends Component {



  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      memo: '',
    }

    this.saveMemo = this.saveMemo.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  saveMemo(e) {
  const memo=this.props.memo;
  this.props.saveMemo(memo);
  // fire method passed down from parent to same the memo
    this.setState({
      showModal: false,
      memo: '',
    });
  }


  render() {
    return (
      <>
        <button
          className="bg-indigo-500 rounded-lg text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => this.setState({showModal: true})}
        >
          Add Comment
        </button>
        {this.state.showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => this.setState({showModal: false})}
                    >
                      <span className=" text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                  <textarea id="story" name="memo" rows="3" cols="30" value={this.state.memo} onChange={this.handleInput}/>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => this.setState({showModal: false})}
                    >
                      Close
                    </button>
                    <button
                      className="bg-green-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={this.saveMemo}
                    >
                      Submit
                    </button>
                  </div>
                </div>

            <div className="opacity-5 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
  }


}

export default Modal;










//
// render() {
//   return (
//     <>
//       <button
//         className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//         type="button"
//         onClick={() => this.setState({showModal: true})}
//       >
//         Add Comments
//       </button>
//       {this.state.showModal ? (
//         <>
//           <div
//             className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
//           >
//             <div className="relative w-auto my-6 mx-auto max-w-3xl">
//               {/*content*/}
//               <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                 {/*header*/}
//                 <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
//                   <h3 className="text-xl font-semibold">
//                     Comment
//                   </h3>
//                   <button
//                     className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                     onClick={() => this.setState({showModal: false})}
//                   >
//                     <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
//                       ×
//                     </span>
//                   </button>
//                 </div>
//                 {/*body*/}
//                 <div className="relative p-6 flex-auto">
//                 <textarea id="story" name="memo" rows="3" cols="30" value={this.state.memo} onChange={this.handleInput}/>
//                 </div>
//                 {/*footer*/}
//                 <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
//                   <button
//                     className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                     type="button"
//                     onClick={() => this.setState({showModal: false})}
//                   >
//                     Close
//                   </button>
//                   <button
//                     className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                     type="button"
//                     onClick={this.saveMemo}
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//         </>
//       ) : null}
//     </>
//   );
// }
//
//
// }
