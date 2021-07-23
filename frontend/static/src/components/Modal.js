import React, { Component } from "react";

class Modal extends Component {



  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      memo: this.props.event.memo,
    }

    this.saveMemo = this.saveMemo.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  saveMemo() {
    const event = this.props.event;
    event.memo = this.state.memo;
    this.props.saveMemo(event);
      this.setState({
        showModal: false,
        memo: '',
      });
  }


  render() {

    const hasMemo = !!this.props.event.memo;
    return (
      <>
        <button
          className="bg-indigo-500 rounded-full text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => this.setState({showModal: true})}
        >
          {hasMemo ? 'View Comment' : 'Add Comment'}
        </button>
        {this.state.showModal ? (
          <>
            <div
              className=" bg-gray-100 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">

                  </div>
                  {/*body*/}
                  <div className="relative flex-auto">
                  <textarea id="story" name="memo" className="pt-8 pb-20" rows="4" cols="35" value={this.state.memo} onChange={this.handleInput} disabled={hasMemo}/>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center pb-3 border-t rounded-b">

                    {hasMemo

                    ?(
                      <>
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-8 py-4 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => this.setState({showModal: false})}
                    >
                      Close
                    </button>
                    </>
                  )


                  : (
                    <>
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => this.setState({showModal: false})}
                    >
                      Close
                    </button>
                    <button
                      className="bg-indigo-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-1 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-8 ease-linear transition-all duration-150"
                      type="button"
                      onClick={this.saveMemo}
                    >
                      Submit
                    </button>
                    </>
                  )
                }
                  </div>
                </div>

            <div className="opacity-5 fixed inset-0 z-40 bg-indigo-400"></div>
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
