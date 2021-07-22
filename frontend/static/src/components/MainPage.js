import { Component } from 'react';

// import background from './../assets/images/background.jpg';

class MainPage extends Component {

  // <a href="www.linkedin.com/in/sayeda-khaled-4aa69b198" className="linkedinLink" target="_top">
  //    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUmOtGailQUMJcuv37p9s1JVhJw59ZC0Fb6A&usqp=CAU" alt="#" />
  // </a>
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

</div>
          <div className="sidedisplay-2 w-4/12">
            <h1 className="text-3xl font-bold" id="main-title" >Shape A Future</h1>
            <p className="my-4 p-4 rounded bg-indigo-500 text-white shadow-2xl-dark transform hover:scale-105 test" id="main-paragraph">
                Shape A future is an app that is aimed to provide a platform for people in the community to sign up and volunteer to read an hour a day for a student who is struggling with reading, via the school system.

                The app makes it easy for school administrators to list all the volunteering opportunities, enroll students who sign up to participate in the program, and assign students to the different volunteering sessions.

                Volunteers may sign up for events, view upcoming events, cancel events, and write reports all in the app.

                Parents can use the app to view and track student progress as we all work together to Shape A Future.
            </p>

          </div>

      </section>


        </>
        )
      }
    }


export default MainPage;
