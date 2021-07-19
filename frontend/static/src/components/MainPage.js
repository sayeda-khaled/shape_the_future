import { Component } from 'react';

// import background from './../assets/images/background.jpg';

class MainPage extends Component {


      //
      // <div class="credit">
      //   * codepen
      // </div>

    render() {


      return (
        <>

         <section className="displayPage md:flex frontPage">
           <div className="front-page-container">

        <div class="imgLoader"></div>

            <div class="frontPageBook">

              <h1 className="title">
                Read<br></br>To Me
              </h1>


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
     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUmOtGailQUMJcuv37p9s1JVhJw59ZC0Fb6A&usqp=CAU" alt="#" />
  </a>
</div>
          <div className="sidedisplay-2 w-4/12">
            <h1 className="text-3xl font-bold wiggle animate-bounce" id="main-title" >Shape The Future</h1>
            <p className="my-4 p-4 rounded bg-indigo-500 text-white shadow-2xl-dark transform hover:scale-105 test" id="main-paragraph-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            <p className="my-4 p-4 rounded bg-indigo-500 text-white shadow-2xl-dark transform hover:scale-105" id="main-paragraph-2">Greenville County Schools (GCS), in an effort to ensure the safety of all of our students, has implemented additional security checks for school volunteers. All volunteers must submit an online application to the district and receive clearance from the district before volunteering at any school/center or chaperoning any school field trip. </p>

          </div>

      </section>


        </>
        )
      }
    }


export default MainPage;
