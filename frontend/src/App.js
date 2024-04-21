import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MathJaxContext } from "better-react-mathjax";
import { UserContext, ApiUrlContext } from "./Context";
import Signin from "./components/user/Signin";
import Header from "./components/other/Header";
import NoPage from "./components/other/NoPage";
import Signup from "./components/user/Signup";
import Home from "./components/main/Home";
import Profile from "./components/user/Profile";
import AdminAuth from "./components/admin/AdminAuth";
import Topics from "./components/admin/Topics";
import Subtopic from "./components/admin/Subtopic";
import Skill from "./components/admin/Skill";
import Learn from "./components/learn/Learn";
import Choose from "./components/learn/Choose";
import Codify from "./components/admin/Codify";

function App() {
  // Context
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("logical-pupil-user")) || {
    username: "",
    token: "",
    loggedIn: false,
    pfp: "default"
  });
  
  const apiUrl = 'http://localhost:3001/';

  // State management
  // Save any changes of user object to local storage
  useEffect(() => {
    localStorage.setItem("logical-pupil-user", JSON.stringify(user))
  }, [user, setUser])

  // Component
  return (
    <MathJaxContext>
    <UserContext.Provider value={[user, setUser]}>
      <ApiUrlContext.Provider value={apiUrl}>
        <BrowserRouter>
          <Routes>
            <Route path="/admin/" element={<AdminAuth />}>
              <Route index path="topics" element={<Topics />} />
              <Route index path="subtopic/:subtopicId" element={<Subtopic />} />
              <Route index path="skill/:skillId" element={<Skill />} />
                <Route path="codify/:questionId" element={<Codify />} />
            </Route>

            <Route path="/" element={<Header />}>
            <Route path="topics" element={<Topics />} />

              <Route index element={<Home />} />
              <Route path="learn/" element={<Learn />} />
              <Route path="choose/:topicid?" element={<Choose />} />


              <Route path="sign-up" element={<Signup />} />
              <Route path="sign-in" element={<Signin />} />
              <Route path="profile" element={<Profile />} />

              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
			</ApiUrlContext.Provider>
    </UserContext.Provider>
    </MathJaxContext>
  );
}

export default App;