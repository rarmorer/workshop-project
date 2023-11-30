import { useEffect, useState, useContext } from "react";
import { ClientContext } from "../Context/Contexts.js";
import { useNavigate } from "react-router-dom";

import Preview from "./Preview.jsx";
import Video from "./Video.jsx";
import "./Session.css";

const Session = () => {
  const [state, setState] = useState("PreSession");
  const { client } = useContext(ClientContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function initClient() {
      let initializedClient = await client.init("en-US", "CDN");
      return initializedClient;
    }

    initClient();
  }, [client]);

  useEffect(() => {
    if (state === "PostSession") {
      // do clean up here?
      navigate("/");
    }
  }, [state, navigate]);

  if (state === "PreSession")
    return <Preview join={() => setState("Session")} />;
  if (state === "Session")
    return <Video leave={() => setState("PostSession")} />;
  if (state === "PostSession")
    return <h1>Clean up tasks and redirect to home</h1>;
};

export default Session;
