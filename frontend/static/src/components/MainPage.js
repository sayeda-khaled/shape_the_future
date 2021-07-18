import { Component } from 'react';

import background from './../assets/images/background.jpg';
import imageNew from './../assets/images/image1-new.jpg';

class MainPage extends Component {

  constructor(props) {
    super(props);

  }

    render() {


      return (
        <>

         <section className="displayPage flex frontPage">
           <div className="front-page-container">

        <div class="imgLoader"></div>

            <div class="frontPageBook">

              <h1 class="title">
                Read<br></br>To Me
              </h1>

              <div class="credit">
                * codepen
              </div>

              <div class="book">
                <div class="gap"></div>
                <div class="pages">
                  <div class="page"></div>
                  <div class="page"></div>
                  <div class="page"></div>
                  <div class="page"></div>
                  <div class="page"></div>
                  <div class="page"></div>
                </div>
                <div class="flips">
                  <div class="flip flip1">
                    <div class="flip flip2">
                      <div class="flip flip3">
                        <div class="flip flip4">
                          <div class="flip flip5">
                            <div class="flip flip6">
                              <div class="flip flip7"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

  <a href="www.linkedin.com/in/sayeda-khaled-4aa69b198" className="linkedinLink" target="_top">
     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUmOtGailQUMJcuv37p9s1JVhJw59ZC0Fb6A&usqp=CAU" />
  </a>
</div>
          <div className="sidedisplay-2 w-4/12">
            <h1 className="text-3xl font-bold" id="main-title" >Shape The Future</h1>
            <p className="my-4 p-4 rounded bg-indigo-500 text-white shadow-2xl-dark transform hover:scale-105 test" id="main-paragraph-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            <p className="my-4 p-4 rounded bg-indigo-500 text-white shadow-2xl-dark transform hover:scale-105" id="main-paragraph-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

          </div>

      </section>


        </>
        )
      }
    }


export default MainPage;
